const { cloudinaryInstance } = require("../config/cloudinary");
const { Food } = require("../model/foodModel");
const { Hotel } = require("../model/hotelModel");

async function createHotel(req, res, next) {
    try {
        console.log('Routes: create hotel')

        let { name, address } = req.body
        name = name.trim()
        address = address.trim()

        // console.log('name :>> ', name);
        // console.log('address :>> ', address);
        // console.log('req.file :>> ', req.file);

        if (!name || !address || !req.file) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const hotelExist = await Hotel.findOne({ name })

        // console.log('hotelExist :>> ', hotelExist);

        if (hotelExist) {
            return res.status(400).json({ message: 'Hotel already exists' })
        }

        const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
            // folder: `FoodOrderingWebSite/Hotel/${name}/HotelImage`,
            folder: `FoodOrderingWebSite/Hotel/${name}`,
            public_id: name
        })).url

        const newHotel = new Hotel({
            name,
            address,
            image: imageUrl
        })

        await newHotel.save()

        res.status(201).json({ message: 'Hotel created', data: newHotel })

    } catch (err) {
        next(err)
    }
}

async function getAllHotel(req, res, next) {
    try {
        console.log('Routes: get all hotel')

        const hotelsExist = await Hotel.find()

        // console.log('hotelsExist :>> ', hotelsExist);

        res.status(200).json({ message: 'Hotels fetched', data: hotelsExist })

    } catch (err) {
        next(err)
    }
}

async function createFood(req, res, next) {
    try {
        console.log('Routes: Food')

        const { hotelId } = req.params
        let { name, description, price } = req.body
        const hotelExist = await Hotel.findById(hotelId)

        name = name.trim()
        description = description.trim()

        if (!name || !description || !price || !req.file) {
            return res.status(400).json({ message: 'All filds are required' })
        }
        if (!hotelExist) {
            return res.status(401).json({ message: 'Hotel not found' })
        }

        const hotelName = hotelExist.name

        const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
            // folder: `FoodOrderingWebSite/Hotel/${hotelName}/FoodImage`,
            folder: `FoodOrderingWebSite/Hotel/${hotelName}`,
            public_id: name
        })).url

        // console.log('imageUrl :>> ', imageUrl);

        const newFood = new Food({
            name,
            description,
            price,
            image: imageUrl,
            hotelId
        })
        await newFood.save()

        // console.log('newFood._id :>> ', newFood._id);

        hotelExist.foodItems.push({
            foodId: newFood._id,
        })

        await hotelExist.save()

        res.status(201).json({ message: 'Food created', data: newFood })

    } catch (err) {
        next(err)
    }
}

async function singleHotel(req, res, next) {
    try {
        console.log('Routes: single hotel')

        const { hotelId } = req.params
        const hotelExist = await Hotel.findById(hotelId).populate('foodItems.foodId')

        if (!hotelExist) {
            return res.status(401).json({ message: 'Hotel not found' })
        }

        res.status(200).json({ message: 'Hotel fetched', data: hotelExist })
    } catch (err) {
        next(err)
    }
}

async function singleFood(req, res, next) {
    try {
        console.log('Routes: single food')

        const { foodId } = req.params
        const foodExist = await Food.findById(foodId)

        console.log('foodId :>> ', foodId);
        console.log('foodExist :>> ', foodExist);

        if (!foodExist) {
            return res.status(404).json({ message: 'Food not found' })
        }

        res.status(200).json({ messsage: 'Food item fetched', data: foodExist })
    } catch (err) {
        next(err)
    }
}

async function getAllFood(req, res, next) {
    try {
        console.log('Routes: All food')

        const foodItems = await Food.find().sort({ _id: -1 }).limit(10)

        res.status(200).json({ message: 'Food items fetched', data: foodItems })
    } catch (err) {
        next(err)
    }
}

async function getAllFoodAdmin(req, res, next) {
    try {
        console.log('Routes: All food')

        const foodItems = await Food.find().sort({ _id: -1 })

        res.status(200).json({ message: 'Food items fetched', data: foodItems })
    } catch (err) {
        next(err)
    }
}

async function deleteHotel(req, res, next) {
    try {
        console.log('Routes: Delete Hotel')

        const { hotelId } = req.params

        if (!hotelId) {
            return res.status(404).json({ message: 'HotelId is required' })
        }

        const hotelExist = await Hotel.findOne({ _id: hotelId })

        if (!hotelExist) {
            return res.status(404).json({ message: 'Hotel does not exist' })
        }

        await Food.deleteMany({ hotelId })
        await Hotel.deleteOne({ _id: hotelId })
        res.status(200).json({ message: 'Hotel Deleted' })
    } catch (err) {
        next(err)
    }
}

async function deleteFood(req, res, next) {
    try {
        console.log('Routes: Delete Food')

        const { foodId } = req.params

        if (!foodId) {
            return res.status(404).json({ message: 'FoodId is required' })
        }

        const foodExist = await Food.findOne({ _id: foodId })

        if (!foodExist) {
            return res.status(400).json({ message: 'Food does not exist' })
        }

        await Hotel.updateMany({}, { $pull: { foodItems: { foodId } } });
        await Food.deleteOne({ _id: foodId })
        res.status(200).json({ message: 'Food item deleted' })

    } catch (err) {
        next(err)
    }
}

module.exports = { createHotel, getAllHotel, createFood, singleHotel, singleFood, getAllFood, getAllFoodAdmin, deleteHotel, deleteFood }