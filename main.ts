// import { Plugin, MarkdownView, PluginSettingTab, Setting } from 'obsidian';

// interface MyPluginSettings {
//     mySetting: string;
// }

// const DEFAULT_SETTINGS: MyPluginSettings = {
//     mySetting: 'default'
// };

// export default class MyPlugin extends Plugin {
//     settings: MyPluginSettings;

//     async onload() {
//         console.log("Split-Diff Plugin Loaded");

//         await this.loadSettings();

//         this.addCommand({
//             id: "split-diff",
//             name: "Split Diff",
//             callback: () => {
//                 this.splitDiff();
//             },
//         });

//         this.addSettingTab(new SampleSettingTab(this.app, this));
//     }

//     async loadSettings() {
//         this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
//     }

//     async saveSettings() {
//         await this.saveData(this.settings);
//     }

//     async splitDiff() {
//         console.log("splitDiff function called!");  // Add this line
//         const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

//         if (!activeView) {
//             console.error("No active Markdown view to split.");
//             return;
//         }

//         if (activeView) {
//             console.log("Active view is of type MarkdownView");
//         }

//         const editor: any = activeView.editor;

//         console.log(Object.getOwnPropertyNames(editor));  // This will log available properties and methods

//         const content: string[] = editor.cm.state.doc.text;

//         console.log("Editor content:", editor.cm.state.doc.text);

//         let leftContent: string[] = [];
//         let rightContent: string[] = [];

//         console.log("Left Content:", leftContent);
//         console.log("Right Content:", rightContent);

//         content.forEach(line => {
//             if (line.startsWith('-')) {
//                 leftContent.push(line.substring(1).trim());
//                 rightContent.push("");  // Empty line on the right side
//             } else if (line.startsWith('+')) {
//                 rightContent.push(line.substring(1).trim());
//                 leftContent.push("");  // Empty line on the left side
//             } else {
//                 leftContent.push(line.trim());
//                 rightContent.push(line.trim());
//             }
//         });

//         const currentLeaf = this.app.workspace.getLeaf();
//         console.log("Current leaf state set.");

//         currentLeaf.setViewState({ type: 'markdown', state: { type: 'source', text: leftContent.join('\n') } });

//         const newLeaf = this.app.workspace.getLeaf(true);
//         const uniqueFileName = `Diff-Right-${Date.now()}`; // This makes the file name unique based on current time
//         await this.app.vault.create(uniqueFileName, rightContent.join('\n'));
//         newLeaf.openFile(this.app.vault.getAbstractFileByPath(uniqueFileName) as any);
//     }

// }

// class SampleSettingTab extends PluginSettingTab {
//     plugin: MyPlugin;

//     constructor(app: any, plugin: MyPlugin) {
//         super(app, plugin);
//         this.plugin = plugin;
//     }

//     display(): void {
//         const { containerEl } = this;

//         containerEl.empty();

//         new Setting(containerEl)
//             .setName('Setting #1')
//             .setDesc('It\'s a secret')
//             .addText(text => text
//                 .setPlaceholder('Enter your secret')
//                 .setValue(this.plugin.settings.mySetting)
//                 .onChange(async (value) => {
//                     this.plugin.settings.mySetting = value;
//                     await this.plugin.saveSettings();
//                 }));
//     }
// }

// V2 - this version works but I'm commenting it out for now

// import { Plugin, MarkdownView, WorkspaceLeaf } from 'obsidian';

// export default class MyPlugin extends Plugin {

//     onload() {
//         console.log('Split-Diff Plugin Loaded');
//         this.addCommand({
//             id: 'split-diff',
//             name: 'Split Diff',
//             callback: this.splitDiff.bind(this)
//         });
//     }

//     splitDiff() {
//         console.log('splitDiff function called!');

//         const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

//         if (activeView) {
//             console.log('Active view is of type MarkdownView');

//             const editor = activeView.editor;
//             const content = editor.getValue().split('\n');

//             const leftContent = [];
//             const rightContent = [];

//             for (let line of content) {
//                 if (line.startsWith('```diff')) {
//                     continue;
//                 }

//                 if (line.startsWith('- ')) {
//                     leftContent.push(line.slice(2));
//                 } else if (line.startsWith('+ ')) {
//                     rightContent.push(line.slice(2));
//                 } else {
//                     leftContent.push(line);
//                     rightContent.push(line);
//                 }
//             }

//             this.displayDiffModal(leftContent.join('\n'), rightContent.join('\n'));
//         }
//     }

//     displayDiffModal(leftContent: string, rightContent: string) {
//         // Create and populate the modal
//         const modalEl = document.createElement('div');
//         modalEl.classList.add('diff-modal');

//         const contentEl = document.createElement('div');
//         contentEl.classList.add('diff-content');

//         const leftEl = document.createElement('div');
//         leftEl.classList.add('diff-left');
//         leftEl.innerHTML = leftContent;

//         const rightEl = document.createElement('div');
//         rightEl.classList.add('diff-right');
//         rightEl.innerHTML = rightContent;

//         contentEl.append(leftEl, rightEl);
//         modalEl.append(contentEl);
//         document.body.append(modalEl);

//         // Close the modal on click outside of the content
//         modalEl.addEventListener('click', (e) => {
//             if (e.target === modalEl) {
//                 modalEl.remove();
//             }
//         });
//     }
// }

// V3 - this is a good modal where it splits left and right

// import { Plugin, MarkdownView, WorkspaceLeaf } from 'obsidian';

// export default class MyPlugin extends Plugin {

//     onload() {
//         console.log('Split-Diff Plugin Loaded');
//         this.addCommand({
//             id: 'split-diff',
//             name: 'Split Diff',
//             callback: this.splitDiff.bind(this)
//         });
//     }

//     splitDiff() {
//         console.log('splitDiff function called!');

//         const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

//         if (activeView) {
//             console.log('Active view is of type MarkdownView');

//             const editor = activeView.editor;
//             const content = editor.getValue().split('\n');

//             const leftContent = [];
//             const rightContent = [];

//             let inDiffBlock = false;

//             for (let line of content) {
//                 if (line.startsWith('```diff')) {
//                     inDiffBlock = true;
//                     continue;
//                 } else if (line.startsWith('```') && inDiffBlock) {
//                     inDiffBlock = false;
//                     continue;
//                 }

//                 if (inDiffBlock) {
//                     if (line.startsWith('- ')) {
//                         leftContent.push('<div class="diff-removed">' + line.slice(2) + '</div>');
//                     } else if (line.startsWith('+ ')) {
//                         rightContent.push('<div class="diff-added">' + line.slice(2) + '</div>');
//                     } else {
//                         leftContent.push(line);
//                         rightContent.push(line);
//                     }
//                 }
//             }

//             this.displayDiffModal(leftContent.join('\n'), rightContent.join('\n'));
//         }
//     }

//     displayDiffModal(leftContent: string, rightContent: string) {
//         // Create and populate the modal
//         const modalEl = document.createElement('div');
//         modalEl.classList.add('diff-modal');

//         const contentEl = document.createElement('div');
//         contentEl.classList.add('diff-content');

//         const leftEl = document.createElement('div');
//         leftEl.classList.add('diff-left');
//         leftEl.innerHTML = leftContent;

//         const rightEl = document.createElement('div');
//         rightEl.classList.add('diff-right');
//         rightEl.innerHTML = rightContent;

//         contentEl.append(leftEl, rightEl);
//         modalEl.append(contentEl);
//         document.body.append(modalEl);

//         // Close the modal on click outside of the content
//         modalEl.addEventListener('click', (e) => {
//             if (e.target === modalEl) {
//                 modalEl.remove();
//             }
//         });
//     }
// }

// V4 is an attempt at the inline code block diffs

import { MarkdownRenderChild, MarkdownRenderer, Plugin, MarkdownPostProcessorContext } from 'obsidian';

export default class MyPlugin extends Plugin {

    onload() {
        console.log('Split-Diff Plugin Loaded');

        // Register the Markdown code block processor for 'split' type.
        this.registerMarkdownCodeBlockProcessor('split', this.renderSplitBlock.bind(this));
    }

    renderSplitBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
        const lines = source.split('\n');

        const leftEl = document.createElement('div');
        const rightEl = document.createElement('div');

        leftEl.classList.add('diff-left');
        rightEl.classList.add('diff-right');

        lines.forEach(line => {
            if (line.startsWith('- ')) {
                const p = document.createElement('p');
                p.innerText = line.slice(2);
                p.classList.add('diff-removed');
                leftEl.appendChild(p);
            } else if (line.startsWith('+ ')) {
                const p = document.createElement('p');
                p.innerText = line.slice(2);
                p.classList.add('diff-added');
                rightEl.appendChild(p);
            } else {
                const p1 = document.createElement('p');
                const p2 = document.createElement('p');
                p1.innerText = line;
                p2.innerText = line;
                leftEl.appendChild(p1);
                rightEl.appendChild(p2);
            }
        });

        el.appendChild(leftEl);
        el.appendChild(rightEl);
    }
}
