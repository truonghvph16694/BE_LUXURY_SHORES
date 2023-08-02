import Cart from "../models/cart"
import dotenv from 'dotenv';

dotenv.config();

export const getAll = async (req, res) => {
    const { _sort = "createAt", _order = "asc", _limit = 10, _page = 1 } = req.query;
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        }, 
    };
    try {
        const cart = await Cart.paginate({}, options);
        if (cart.length === 0) {
            return res.json({
                message: "Không có hóa đơn nào",
            });
        }
        return res.json(cart);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};

export const add = async (req,res) => {
    try {
      const {tm_codeorder} = req.body
      const exitsCart = await Cart.findOne({tm_codeorder})
      if(exitsCart) {
        return res.json({code: 400, message: "Đã tồn tại mã đơn hàng"})
      }
      const carts = await Cart(req.body).save()
      res.json({
        code: 200, 
        carts
      })
    } catch (error) {
      res.status(400).json(error)
    }
}
export const get = async (req,res) => {
  try {
      const cart = await Cart.findOne({userID: req.params.id}).exec()
      res.json(cart)
  } catch (error) {
      res.status(400).json(error)
  }
}
export const update = async (req,res) => {
try {
const cart = await Cart.findByIdAndUpdate({_id: req.params.id}, req.body, {
  returnDocument: "after"
}).exec()
res.json(cart)
} catch (error) {
res.status(400).json(error)
}
}
export const remove = async (req,res) => {
try {
const cart = await Cart.findByIdAndRemove({_id: req.params.id}).exec() 
res.json(cart)
} catch (error) {
res.status(400).json(error)

}
}