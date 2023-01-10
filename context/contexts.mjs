import designController from '../controllers/designController.mjs';
export default {
  desings: async (parent, args, context) =>
    await designController.designs(parent, args, context),
};
