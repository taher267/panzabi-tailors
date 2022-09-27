import designController from '../controllers/designController.js';
import measurementController from '../controllers/measurementController.js';
import orderController from '../controllers/orderController.js';
import productController from '../controllers/productController.js';
import userController from '../controllers/userController.js';
import customerController from '../controllers/customerController.js';
import authController from '../controllers/authController.js';

export default {
  Query: {
    designs: designController.designs,
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
  },
  
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
    updateOrder: orderController.updateOrder,
    deleteOrder: orderController.deleteOrder,
  },
};
