# Swagger 单一来源落地计划

## 目标

`unisat-dev-docs/open-api/swagger-source` 是唯一允许编辑的 OpenAPI Swagger 来源。

- `unisat-dev-docs` 发布合并后的 `swagger.yaml`、拆分文件和 `manifest.json`。
- `openapi-swagger` 不保存 Swagger YAML，Swagger UI 每次打开直接读取远程 `swagger.yaml`。
- `unisat-ai-kit` 不保存或打包 Swagger YAML，运行时通过 Manifest 下载拆分文件并使用本地缓存。

## 迁移前差异基线

- 两个仓库各有 19 个同名 Swagger YAML。
- 其中 18 个文件字节完全一致。
- 只有 `inscribe-v5.yaml` 不同：`openapi-swagger` 多出 Bitcoin、Fractal 两个 `servers`；去掉该字段后，两份 YAML 的解析结果完全一致。
- 两边的合并配置都遗漏了已经存在的 `cat20-dex.yaml`。
- 本次迁移将 `servers` 和 `cat20-dex` 一并收回 `unisat-dev-docs`。

## 发布接口

| URL | 使用方 | 缓存策略 |
| --- | --- | --- |
| `/swagger/swagger.yaml` | Swagger UI、其他完整文档消费者 | 短缓存；客户端添加时间戳或 hash 参数 |
| `/swagger/manifest.json` | `unisat-ai-kit` | 每次刷新时重新验证 |
| `/swagger/files/<name>.yaml` | `unisat-ai-kit` | 按 Manifest SHA-256 校验 |
| `/swagger/openapi-swagger.yaml` | 旧链接兼容 | 迁移期保留 |

Manifest `schemaVersion` 当前为 `1`，`version` 优先使用构建环境提供的版本或 Git ref，否则使用当前 commit 短 SHA。消费者判断内容变化以 `bundle.sha256` 为准。

## 仓库改造清单

### unisat-dev-docs

- [x] `tools/build-swagger.js` 生成 `swagger.yaml`。
- [x] 发布参与合并的拆分 YAML 到 `website/static/swagger/files`。
- [x] 生成带版本、commit、bundle hash、文件 hash 和文件大小的 `manifest.json`。
- [x] 保留 `openapi-swagger.yaml` 兼容旧公开 URL。
- [x] 将 `cat20-dex` 纳入合并文档及拆分文件列表。
- [x] 将 Inscribe V5 的 Bitcoin、Fractal `servers` 收回唯一来源。
- [x] 网站自身改用 `/swagger/swagger.yaml`。
- [x] 提供静态资源 CORS 和缓存头配置文件。
- [ ] 部署平台确认并实际启用 `_headers` 中的 CORS 配置。
- [ ] 部署后线上文件与 Manifest 一致性验证，由维护者执行。

### openapi-swagger

- [x] 删除 `project/open-api/swagger` 中的 Swagger 副本。
- [x] 删除向 `unisat-dev-docs` 同步及漂移检查的脚本和命令。
- [x] 删除本地 Swagger 合并和子 Swagger 生成配置。
- [x] Swagger UI 运行时直接加载 `https://api-docs.unisat.io/swagger/swagger.yaml`。
- [x] 每次页面初始化添加时间戳查询参数，避免使用旧缓存。
- [x] Gateway YAML 和运行时快照逻辑保持不变。
- [ ] 部署后的浏览器跨域加载验证，由维护者执行。

### unisat-ai-kit

- [x] 删除仓库 Swagger YAML 副本。
- [x] 删除 npm、portable 和单文件程序中的 Swagger 内置步骤。
- [x] 启动时从 `/swagger/manifest.json` 获取版本和拆分文件列表。
- [x] 校验文件同源、大小、SHA-256 和 OpenAPI 基本结构。
- [x] 使用按 bundle hash 分版本的用户缓存目录和原子状态切换。
- [x] 缓存默认 TTL 为 24 小时；刷新失败时允许使用已验证的旧缓存。
- [x] 支持 `OPENAPI_SWAGGER_DIR` 本地目录覆盖。
- [x] 提供 `swagger status`、`swagger refresh` 和 `swagger refresh --force`。
- [x] MCP 服务连接前初始化缓存；正在运行的 MCP 不热切换版本。
- [x] 增加不依赖线上服务的下载、缓存和刷新 smoke test。
- [ ] 使用正式部署的 Manifest 做验收，由维护者执行。

## 运行时规则

1. `OPENAPI_SWAGGER_DIR` 存在时使用指定目录并关闭远程刷新。
2. 有未过期缓存时直接使用，不产生网络请求。
3. 缓存缺失或过期时读取 Manifest。
4. bundle hash 未变化时只更新检查时间。
5. bundle hash 变化时下载所有拆分文件到 staging 目录。
6. 所有文件验证通过后，原子更新 `state.json`。
7. 下载失败且存在有效旧缓存时继续使用旧缓存并告警。
8. 下载失败且没有缓存时终止，并提示运行手动刷新命令。

## 环境变量

| 变量 | 作用 |
| --- | --- |
| `UNISAT_OPENAPI_MANIFEST_URL` | 覆盖 Manifest URL |
| `UNISAT_OPENAPI_CACHE_DIR` | 覆盖用户缓存目录 |
| `UNISAT_OPENAPI_CACHE_TTL_MS` | 覆盖缓存检查周期 |
| `OPENAPI_SWAGGER_DIR` | 直接使用本地 Swagger 目录，优先级最高 |

## 验证边界

每个仓库只执行自身的构建、单元或 smoke 检查。本计划不自动执行跨仓部署、远程文件一致性或线上浏览器联调；这些步骤由维护者在部署顺序确定后执行。

建议部署顺序：`unisat-dev-docs` → 确认 CORS 和静态文件 → `openapi-swagger` → `unisat-ai-kit`。
