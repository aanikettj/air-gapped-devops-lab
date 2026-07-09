import { getAllProducts, getProductById, searchProducts, getCategories, updateProductImageByName } from '../models/product.js';

export const getProducts = async (req, res) => {
  try {
    const { category, search, limit = 20, offset = 0 } = req.query;

    let products;
    if (search) {
      products = await searchProducts(search, parseInt(limit), parseInt(offset));
    } else {
      products = await getAllProducts(category, parseInt(limit), parseInt(offset));
    }

    res.json({ products, total: products.length });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Failed to fetch product', error: error.message });
  }
};

export const updateProductImage = async (req, res) => {
  try {
    const { name, image_url } = req.body;

    if (!name || !image_url) {
      return res.status(400).json({ message: 'Product name and image_url are required' });
    }

    const updatedProducts = await updateProductImageByName(name, image_url);

    if (updatedProducts.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product image updated', updatedProducts });
  } catch (error) {
    console.error('Update product image error:', error);
    res.status(500).json({ message: 'Failed to update product image', error: error.message });
  }
};

export const getCategoriesList = async (req, res) => {
  try {
    const categories = await getCategories();
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
  }
};
