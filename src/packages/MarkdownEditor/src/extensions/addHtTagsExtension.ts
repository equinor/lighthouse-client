import { ApplySchemaAttributes, CommandFunction, extension, ExtensionPriority, ExtensionTag, KeyBindings, NodeExtension, NodeExtensionSpec, NodeSpecOverride } from "remirror";
//
// @extension({
//   defaultPriority: ExtensionPriority.Low,
// })
//
export class HeatTraceExtension extends NodeExtension {
  get name() {
    return 'heatTraceAdd' as const;
  }

  createTags() {
    return [ExtensionTag.InlineNode];
  }

  createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec {
    return {
      inline: true,
      selectable: false,
      atom: true,
      leafText: () => '\n',
      ...override,
      attrs: extra.defaults(),
      parseDOM: [{ tag: 'br', getAttrs: extra.parse }, ...(override.parseDOM ?? [])],
      toDOM: (node) => ['br', extra.dom(node)],
    };
  }

  createKeymap(): KeyBindings {
    return {
    };
  }

  /**
   * Inserts a hardBreak `<br />` tag into the editor.
   */
  // @command()
  insertHtTags(): CommandFunction {
    return (props) => {
      const { tr, dispatch } = props;

      // Create the `hardBreak`
      dispatch?.(tr.replaceSelectionWith(this.type.create()).scrollIntoView());

      return true;
    };
  }
}

declare global {
  namespace Remirror {
    interface AllExtensions {
      htTags: HeatTraceExtension;
    }
  }
}
