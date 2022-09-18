import designController from '../controllers/designController.js';
export default {
  desings: async (parent, args, context) =>
    await designController.designs(parent, args, context),
};
