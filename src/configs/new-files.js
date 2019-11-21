Object.defineProperty(exports, 'items', {
  value: [
    {
      path: '../.prettierrc',
      content:
        '{\r\n"printWidth": 100,\r\n"singleQuote": true,\r\n"trailingComma": "all",\r\n"semi": false,\r\n"arrowParens": "always"\r\n}',
    },
    {
      path: 'app/configs/global.config.ts',
      content:
        "import { version } from '../../../package.json'\r\nexport const VERSION = version\r\nexport const BASEURL = 'https://api-baseurl.ch/'",
    },
    {
      path: 'app/core/models/core.enums.ts',
      content: 'export enum RoutesEnum {}',
    },
    {
      path: 'app/core/models/core.interfaces.ts',
      content: '// export interface SideNavigation {}',
    },
    {
      path: 'app/core/models/core.models.ts',
      content: '// export class Session { constructor(){} }',
    },
    {
      path: 'scss/base/_colors.scss',
      content:
        '$us-color-settings: (\r\n  primary: (\r\n    base: #3880ff,\r\n  ),\r\n  secondary: (\r\n    base: #0cd1e8,\r\n  ),\r\n  tertiary: (\r\n    base: #7044ff,\r\n  ),\r\n  light: (\r\n    base: #f4f5f8,\r\n  ),\r\n  medium: (\r\n    base: #989aa2,\r\n  ),\r\n  dark: (\r\n    base: #222428,\r\n  ),\r\n);\r\n\r\n$color-darken: 12%;\r\n$color-lighten: 12%;\r\n$color-opacity: 0.3;',
    },
    {
      path: 'scss/_shared.scss',
      content:
        "// Base\r\n@import 'base/colors';\r\n\r\n// Us-mixin\r\n@import '~@ultrastark/us-mixin/mixin';",
    },
    {
      path: 'scss/main.scss',
      content: "// Base\r\n@import 'shared';\r\n@import '~@ultrastark/us-mixin/utilities';",
    },
  ],
  enumerable: true,
  writable: false,
  configurable: false,
})
