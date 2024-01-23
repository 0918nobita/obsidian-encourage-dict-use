import { type App, Modal, Setting } from 'obsidian';

import type { DictStickyNote } from './dict-sticky-note';

export class StickyNoteAdditionModal extends Modal {
    word: string;
    memo: string;

    onSubmit: (dictStickyNote: DictStickyNote) => void;

    constructor(app: App, onSubmit: (dictStickynote: DictStickyNote) => void) {
        super(app);
        this.word = '';
        this.memo = '';
        this.onSubmit = onSubmit;
    }

    onOpen() {
        const { contentEl, titleEl } = this;

        titleEl.setText('Add sticky note');

        new Setting(contentEl).setName('Word').addText((text) => {
            text.onChange((newValue) => {
                this.word = newValue;
            });
        });

        new Setting(contentEl).setName('Memo').addTextArea((textArea) => {
            textArea.onChange((newValue) => {
                this.memo = newValue;
            });
        });

        new Setting(contentEl).addButton((button) => {
            button
                .setButtonText('Add')
                .setCta()
                .onClick(() => {
                    this.close();
                    this.onSubmit({ word: this.word, memo: this.memo });
                });
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
