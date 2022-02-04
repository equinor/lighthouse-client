// vite.config.ts
import react from "@vitejs/plugin-react";
import {
  resolve
} from "path";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";
var vite_config_default = defineConfig({
  plugins: [react()],
  preview: {
    port: 3e3
  },
  server: {},
  define: {
    "process.env": {}
  },
  resolve: {
    alias: {
      "@equinor/portal-client": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/Core/Client"),
      "@equinor/sidesheet": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/Sidesheet"),
      "@equinor/worker": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/WebWorkers"),
      "@equinor/filter": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/Filter"),
      "@equinor/VisualEditor": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/VisualEditor"),
      "@equinor/Form": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/Form"),
      "@equinor/WorkSpace": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/Core/WorkSpace"),
      "@equinor/PageViewer": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/Core/PageViewer"),
      "@equinor/GroupView": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/Core/GroupView"),
      "@equinor/DataFactory": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/Core/DataFactory"),
      "@equinor/ErrorBoundary": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/Core/ErrorBoundary"),
      "@equinor/StatusBar": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/StatusBar"),
      "@equinor/Diagrams": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/Diagrams"),
      "@equinor/ThreeDViewer": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/ThreeDViewer"),
      "@equinor/Table": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/Table"),
      "@equinor/authentication": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/authentication"),
      "@equinor/http-client": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/Core/httpClient/"),
      "@equinor/lighthouse-core": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./packages/core/"),
      "@equinor/lighthouse-hooks": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./packages/hooks/"),
      "@equinor/lighthouse-util": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./packages/util/"),
      "@equinor/lighthouse-typeGuard": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./packages/typeGuard/"),
      "@equinor/lighthouse-conf": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./packages/configuration/"),
      "@equinor/Kpi": resolve("C:\\Projects\\Lighthouse\\lighthouse-client", "./src/packages/KPI")
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            {
              src: "./doc/dataView.md",
              dest: "dist/"
            }
          ],
          hook: "writeBundle"
        })
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBjb3B5IGZyb20gJ3JvbGx1cC1wbHVnaW4tY29weSc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuXHJcbiAgICBwcmV2aWV3OiB7XHJcbiAgICAgICAgcG9ydDogMzAwMCxcclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICAvLyBodHRwczogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgICAncHJvY2Vzcy5lbnYnOiB7fSxcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgJ0BlcXVpbm9yL3BvcnRhbC1jbGllbnQnOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9Db3JlL0NsaWVudCcpLFxyXG4gICAgICAgICAgICAnQGVxdWlub3Ivc2lkZXNoZWV0JzogcGF0aC5yZXNvbHZlKFwiQzpcXFxcUHJvamVjdHNcXFxcTGlnaHRob3VzZVxcXFxsaWdodGhvdXNlLWNsaWVudFwiLCAnLi9zcmMvcGFja2FnZXMvU2lkZXNoZWV0JyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci93b3JrZXInOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9wYWNrYWdlcy9XZWJXb3JrZXJzJyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9maWx0ZXInOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9wYWNrYWdlcy9GaWx0ZXInKSxcclxuICAgICAgICAgICAgJ0BlcXVpbm9yL1Zpc3VhbEVkaXRvcic6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFByb2plY3RzXFxcXExpZ2h0aG91c2VcXFxcbGlnaHRob3VzZS1jbGllbnRcIiwgJy4vc3JjL3BhY2thZ2VzL1Zpc3VhbEVkaXRvcicpLFxyXG4gICAgICAgICAgICAnQGVxdWlub3IvRm9ybSc6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFByb2plY3RzXFxcXExpZ2h0aG91c2VcXFxcbGlnaHRob3VzZS1jbGllbnRcIiwgJy4vc3JjL3BhY2thZ2VzL0Zvcm0nKSxcclxuICAgICAgICAgICAgJ0BlcXVpbm9yL1dvcmtTcGFjZSc6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFByb2plY3RzXFxcXExpZ2h0aG91c2VcXFxcbGlnaHRob3VzZS1jbGllbnRcIiwgJy4vc3JjL0NvcmUvV29ya1NwYWNlJyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9QYWdlVmlld2VyJzogcGF0aC5yZXNvbHZlKFwiQzpcXFxcUHJvamVjdHNcXFxcTGlnaHRob3VzZVxcXFxsaWdodGhvdXNlLWNsaWVudFwiLCAnLi9zcmMvQ29yZS9QYWdlVmlld2VyJyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9Hcm91cFZpZXcnOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9Db3JlL0dyb3VwVmlldycpLFxyXG4gICAgICAgICAgICAnQGVxdWlub3IvRGF0YUZhY3RvcnknOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9Db3JlL0RhdGFGYWN0b3J5JyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9FcnJvckJvdW5kYXJ5JzogcGF0aC5yZXNvbHZlKFwiQzpcXFxcUHJvamVjdHNcXFxcTGlnaHRob3VzZVxcXFxsaWdodGhvdXNlLWNsaWVudFwiLCAnLi9zcmMvQ29yZS9FcnJvckJvdW5kYXJ5JyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9TdGF0dXNCYXInOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9wYWNrYWdlcy9TdGF0dXNCYXInKSxcclxuICAgICAgICAgICAgJ0BlcXVpbm9yL0RpYWdyYW1zJzogcGF0aC5yZXNvbHZlKFwiQzpcXFxcUHJvamVjdHNcXFxcTGlnaHRob3VzZVxcXFxsaWdodGhvdXNlLWNsaWVudFwiLCAnLi9zcmMvcGFja2FnZXMvRGlhZ3JhbXMnKSxcclxuICAgICAgICAgICAgJ0BlcXVpbm9yL1RocmVlRFZpZXdlcic6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFByb2plY3RzXFxcXExpZ2h0aG91c2VcXFxcbGlnaHRob3VzZS1jbGllbnRcIiwgJy4vc3JjL3BhY2thZ2VzL1RocmVlRFZpZXdlcicpLFxyXG4gICAgICAgICAgICAnQGVxdWlub3IvVGFibGUnOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9wYWNrYWdlcy9UYWJsZScpLFxyXG4gICAgICAgICAgICAnQGVxdWlub3IvYXV0aGVudGljYXRpb24nOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9wYWNrYWdlcy9hdXRoZW50aWNhdGlvbicpLFxyXG4gICAgICAgICAgICAnQGVxdWlub3IvaHR0cC1jbGllbnQnOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9Db3JlL2h0dHBDbGllbnQvJyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9saWdodGhvdXNlLWNvcmUnOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3BhY2thZ2VzL2NvcmUvJyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9saWdodGhvdXNlLWhvb2tzJzogcGF0aC5yZXNvbHZlKFwiQzpcXFxcUHJvamVjdHNcXFxcTGlnaHRob3VzZVxcXFxsaWdodGhvdXNlLWNsaWVudFwiLCAnLi9wYWNrYWdlcy9ob29rcy8nKSxcclxuICAgICAgICAgICAgJ0BlcXVpbm9yL2xpZ2h0aG91c2UtdXRpbCc6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFByb2plY3RzXFxcXExpZ2h0aG91c2VcXFxcbGlnaHRob3VzZS1jbGllbnRcIiwgJy4vcGFja2FnZXMvdXRpbC8nKSxcclxuICAgICAgICAgICAgJ0BlcXVpbm9yL2xpZ2h0aG91c2UtdHlwZUd1YXJkJzogcGF0aC5yZXNvbHZlKFwiQzpcXFxcUHJvamVjdHNcXFxcTGlnaHRob3VzZVxcXFxsaWdodGhvdXNlLWNsaWVudFwiLCAnLi9wYWNrYWdlcy90eXBlR3VhcmQvJyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9saWdodGhvdXNlLWNvbmYnOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3BhY2thZ2VzL2NvbmZpZ3VyYXRpb24vJyksXHJcbiAgICAgICAgICAgICdAZXF1aW5vci9LcGknOiBwYXRoLnJlc29sdmUoXCJDOlxcXFxQcm9qZWN0c1xcXFxMaWdodGhvdXNlXFxcXGxpZ2h0aG91c2UtY2xpZW50XCIsICcuL3NyYy9wYWNrYWdlcy9LUEknKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgY29tbW9uanNPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICBjb3B5KHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogJy4vZG9jL2RhdGFWaWV3Lm1kJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3Q6ICdkaXN0LycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBob29rOiAnd3JpdGVCdW5kbGUnLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDO0FBQUEsRUFFVixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUE7QUFBQSxFQUVWLFFBQVE7QUFBQSxFQUdSLFFBQVE7QUFBQSxJQUNKLGVBQWU7QUFBQTtBQUFBLEVBRW5CLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILDBCQUEwQixBQUFLLFFBQVEsK0NBQStDO0FBQUEsTUFDdEYsc0JBQXNCLEFBQUssUUFBUSwrQ0FBK0M7QUFBQSxNQUNsRixtQkFBbUIsQUFBSyxRQUFRLCtDQUErQztBQUFBLE1BQy9FLG1CQUFtQixBQUFLLFFBQVEsK0NBQStDO0FBQUEsTUFDL0UseUJBQXlCLEFBQUssUUFBUSwrQ0FBK0M7QUFBQSxNQUNyRixpQkFBaUIsQUFBSyxRQUFRLCtDQUErQztBQUFBLE1BQzdFLHNCQUFzQixBQUFLLFFBQVEsK0NBQStDO0FBQUEsTUFDbEYsdUJBQXVCLEFBQUssUUFBUSwrQ0FBK0M7QUFBQSxNQUNuRixzQkFBc0IsQUFBSyxRQUFRLCtDQUErQztBQUFBLE1BQ2xGLHdCQUF3QixBQUFLLFFBQVEsK0NBQStDO0FBQUEsTUFDcEYsMEJBQTBCLEFBQUssUUFBUSwrQ0FBK0M7QUFBQSxNQUN0RixzQkFBc0IsQUFBSyxRQUFRLCtDQUErQztBQUFBLE1BQ2xGLHFCQUFxQixBQUFLLFFBQVEsK0NBQStDO0FBQUEsTUFDakYseUJBQXlCLEFBQUssUUFBUSwrQ0FBK0M7QUFBQSxNQUNyRixrQkFBa0IsQUFBSyxRQUFRLCtDQUErQztBQUFBLE1BQzlFLDJCQUEyQixBQUFLLFFBQVEsK0NBQStDO0FBQUEsTUFDdkYsd0JBQXdCLEFBQUssUUFBUSwrQ0FBK0M7QUFBQSxNQUNwRiw0QkFBNEIsQUFBSyxRQUFRLCtDQUErQztBQUFBLE1BQ3hGLDZCQUE2QixBQUFLLFFBQVEsK0NBQStDO0FBQUEsTUFDekYsNEJBQTRCLEFBQUssUUFBUSwrQ0FBK0M7QUFBQSxNQUN4RixpQ0FBaUMsQUFBSyxRQUFRLCtDQUErQztBQUFBLE1BQzdGLDRCQUE0QixBQUFLLFFBQVEsK0NBQStDO0FBQUEsTUFDeEYsZ0JBQWdCLEFBQUssUUFBUSwrQ0FBK0M7QUFBQTtBQUFBO0FBQUEsRUFHcEYsT0FBTztBQUFBLElBQ0gsaUJBQWlCO0FBQUEsTUFDYix5QkFBeUI7QUFBQTtBQUFBLElBRTdCLGVBQWU7QUFBQSxNQUNYLFNBQVM7QUFBQSxRQUNMLEtBQUs7QUFBQSxVQUNELFNBQVM7QUFBQSxZQUNMO0FBQUEsY0FDSSxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUE7QUFBQTtBQUFBLFVBR2QsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
