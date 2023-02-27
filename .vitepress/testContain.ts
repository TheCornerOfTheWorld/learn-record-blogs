import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import type { RenderRule } from "markdown-it/lib/renderer";

type ContainerArgs = [typeof container, string, { render: RenderRule }];

function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt
): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice(klass.length).trim();
        console.log(info);
        console.log(token);
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle);
          console.log(title);
          if (klass === "details") {
            return `<details class="${klass} custom-block"><summary>${title}</summary>\n`;
          }
          return `<div class="${klass} custom-block"><p class="custom-block-title">${title}</p>\n`;
        } else {
          return klass === "details" ? `</details>\n` : `</div>\n`;
        }
      },
    },
  ];
}

export default (md: MarkdownIt) => {
  md.use(...createContainer("demo", "Details", md));
};
