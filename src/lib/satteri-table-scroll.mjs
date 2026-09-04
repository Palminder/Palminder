/**
 * Sätteri hast plugin that wraps every Markdown table in a keyboard-focusable scroll region,
 * so wide tables scroll horizontally inside the content column instead of the viewport.
 *
 * Shape follows `HastPluginDefinition` from `satteri`: a filtered element visitor, so only
 * `<table>` nodes cross the Rust/JS boundary.
 */
export const tableScrollPlugin = {
  name: 'portfolio:table-scroll',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      ctx.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-scroll'],
          role: 'region',
          ariaLabel: 'Scrollable table',
          tabIndex: 0,
        },
        children: [],
      });
    },
  },
};
