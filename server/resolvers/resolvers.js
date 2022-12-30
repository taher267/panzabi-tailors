import designController from '../controllers/designController.js';
import measurementController from '../controllers/measurementController.js';
import orderController from '../controllers/orderController.js';
import productController from '../controllers/productController.js';
import userController from '../controllers/userController.js';
import customerController from '../controllers/customerController.js';
import authController from '../controllers/authController.js';
import dailyAccountController from '../controllers/dailyAccountController.js';
import others from './others.js';

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
    // Daily Account
    allAccounts: dailyAccountController.allAccounts,
    getDailyAccount: dailyAccountController.getDailyAccount,
    //Order
    allOrders: orderController.allOrders,
    getOrder: orderController.getOrder,
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
    deleteOrder: orderController.deleteOrder,

    //Daily Account functions
    createDailyAccount: dailyAccountController.createDailyAccount,
    updateDailyAccount: dailyAccountController.updateDailyAccount,
    deleteDailyAccount: dailyAccountController.deleteDailyAccount,
  },
};
