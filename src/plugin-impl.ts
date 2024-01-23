import * as Obsidian from 'obsidian';

import type { Plugin } from './plugin';
import { Settings, settingsSchema } from './settings';
import { StickyNoteAdditionModal } from './sticky-note-addition-modal';

export class PluginImpl extends Obsidian.Plugin implements Plugin {
    settings!: Settings;

    async onload() {
        const parseResult = settingsSchema.safeParse(await this.loadData());
        if (!parseResult.success) {
            console.error(parseResult.error);
            return;
        }

        this.settings = parseResult.data;

        this.addCommand({
            id: 'add-sticky-note',
            name: 'Add sticky note',
            checkCallback: (checking) => {
                if (checking) return true;

                const modal = new StickyNoteAdditionModal(
                    this.app,
                    (dictStickyNote) => {
                        console.log('Adding sticky note', dictStickyNote);
                    },
                );

                modal.open();
            },
        });
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
