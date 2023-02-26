import designController from '../controllers/designController.mjs';
import measurementController from '../controllers/measurementController.mjs';
import orderController from '../controllers/orderController.mjs';
import productController from '../controllers/productController.mjs';
import userController from '../controllers/userController.mjs';
import customerController from '../controllers/customerController.mjs';
import authController from '../controllers/authController.mjs';
import dailyAccountController from '../controllers/dailyAccountController.mjs';
import others from './others.mjs';
import templateController from '../controllers/templateController.mjs';
import inputFieldsController from '../controllers/inputFieldsController.mjs';

export default {
  Query: {
    allDesigns: designController.allDesigns,
    getDesign: designController.getDesign,
    // Product
    allProducts: productController.allProducts,
    getProduct: productController.getProduct,
    // User functons
    allUsers: userController.allUsers,
    getUser: userController.getUser,
    // Customer functons
    allCustomers: customerController.allCustomers,
    getCustomer: customerController.getCustomer,
    // Measurement functions
    allMeasurements: measurementController.allMeasurements,
    getMeasurement: measurementController.getMeasurement,
    allTemplates: templateController.allTempates,
    // Daily Account
    allAccounts: dailyAccountController.allAccounts,
    getDailyAccount: dailyAccountController.getDailyAccount,
    //Order
    allOrders: orderController.allOrders,
    // userOrderItems: orderController.allOrders,
    getOrder: orderController.getOrder,
    getOrderItem: orderController.getOrderItem,
    // Input fields
    allFields: inputFieldsController.allInputFields,
    getInputField: inputFieldsController.getInputField,
  },
  ...others,
  Mutation: {
    userLogin: authController.login,
    userSignup: authController.signup,
    //Design Functions
    createDesign: designController.createDesign,
    updateDesign: designController.updateDesign,
    deleteDesign: designController.deleteDesign,
    //Product Functions
    createProduct: productController.createProduct,
    updateProduct: productController.updateProduct,
    deleteProduct: productController.deleteProduct,
    // user functions
    createUser: userController.createUser,
    updateUser: userController.updateUser,
    deleteUser: userController.deleteUser,
    // Customer functions
    createCustomer: customerController.createCustomer,
    updateCustomer: customerController.updateCustomer,
    deleteCustomer: customerController.deleteCustomer,
    // Measurement functions
    createMeasurement: measurementController.createMeasurement,
    updateMeasurement: measurementController.updateMeasurement,
    deleteMeasurement: measurementController.deleteMeasurement,
    //Order functions
    createOrder: orderController.createOrder,
    addNewOrderItem: orderController.addNewOrderItem,
    updateOrder: orderController.updateOrder,
    updatePayment: orderController.updatePayment,
    updateOrderItem: orderController.updateOrderItem,
    deleteOrder: orderController.deleteOrder,
    // Tempate functions
    createTemplate: templateController.createTempate,

    //Daily Account functions
    createDailyAccount: dailyAccountController.createDailyAccount,
    updateDailyAccount: dailyAccountController.updateDailyAccount,
    deleteDailyAccount: dailyAccountController.deleteDailyAccount,

    // input Fields functions
    createInputField: inputFieldsController.createInputField,
  },
};
