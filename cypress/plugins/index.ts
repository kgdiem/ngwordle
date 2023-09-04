import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';

export default (on: any, config: any) => {
  addMatchImageSnapshotPlugin(on, config);
};
