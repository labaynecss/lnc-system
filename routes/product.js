const express = require ('express');
const router = express.Router();
const { authenticatateJWT } = require('../middleware/authenticator');
const upload = require('../middleware/multer'); 
const productController = require('../controllers/product');

router.post(
    '/', 
    authenticatateJWT
    , upload.single('productImage'), 
    productController.create);

router.get('/', productController.readAll);
router.get('/count', productController.readByCount);
router.get('/:productId', productController.read);
router.put('/:productId', authenticatateJWT, upload.single('productImage'), productController.update);
router.delete('/:productId', authenticatateJWT, productController.delete);




module.exports = router;