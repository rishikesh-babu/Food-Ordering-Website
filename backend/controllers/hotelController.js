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

        if (hotelExist) {
            return res.status(400).json({ message: 'Hotel already exists' })
        }

        const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
            // folder: `FoodOrderingWebSite/Hotel/${name}/HotelImage`,
            folder: `FoodOrderingWebSite/Hotel`,
            public_id: name
        })).secure_url

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

        let { name, description, price, hotelId } = req.body

        if (!hotelId) {
            return res.status(400).json({ message: 'Hotel Id is required' })
        }

        name = name?.trim()
        description = description?.trim()

        if (!name || !description || !price || !req.file) {
            return res.status(400).json({ message: 'All filds are required' })
        }

        const hotelExist = await Hotel.findById(hotelId)

        if (!hotelExist) {
            return res.status(401).json({ message: 'Hotel not found' })
        }

        const foodExist = await Food.findOne({ name })

        if (foodExist) {
            return res.status(400).json({ message: `${name} already exist` })
        }

        const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
            // folder: `FoodOrderingWebSite/Hotel/${hotelName}/FoodImage`,
            folder: `FoodOrderingWebSite/Hotel`,
            public_id: name
        })).secure_url

        // console.log('imageUrl :>> ', imageUrl);

        const newFood = new Food({
            name,
            description,
            price,
            image: imageUrl,
            hotelId
        })
        await newFood.save()

        res.status(201).json({ message: 'Food created', data: newFood })

    } catch (err) {
        next(err)
    }
}

async function singleHotel(req, res, next) {
    try {
        console.log('Routes: single hotel')

        const { hotelId } = req.params

        if (!hotelId) {
            return res.status(400).json({ message: 'Hotel Id is required' })
        }

        const hotelExist = await Hotel.findById(hotelId)

        if (!hotelExist) {
            return res.status(401).json({ message: 'Hotel not found' })
        }

        res.status(200).json({ message: 'Hotel fetched', data: hotelExist })
    } catch (err) {
        next(err)
    }
}

async function singleHotelFood(req, res, next) {
    try {
        console.log('Routes: Single Hotel Food')

        const { hotelId } = req.params

        if (!hotelId) {
            return res.status(400).json({ message: 'Hotel Id is required' })
        }

        const foodItems = await Food.find({ hotelId })

        return res.status(200).json({ message: 'Food Items fetched', data: foodItems })

    } catch (err) {
        next(err)
    }
}

async function singleFood(req, res, next) {
    try {
        console.log('Routes: single food')

        const { foodId } = req.params

        if (!foodId) {
            return res.status(400).json({ message: 'Food Id is required' })
        }
        const foodExist = await Food.findById(foodId)

        // console.log('foodId :>> ', foodId);
        // console.log('foodExist :>> ', foodExist);

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

        const foodExist = await Food.find({ hotelId })
        if (foodExist) {
            return res.status(400).json({ message: 'Delete all the food items' })
        }

        const publicId = `FooFoodOrderingWebSite/Hotel/${hotelExist.name}`
        
        await cloudinaryInstance.uploader.destroy(publicId)
        res.status(200).json({ message: 'Hotel Deleted' })
        return 
        await Hotel.deleteOne({ _id: hotelId })

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

        await cloudinaryInstance.uploader.destroy(`FoodOrderingWebSite/Hotel/${foodExist.name}`)
        await Food.deleteOne({ _id: foodId })
        res.status(200).json({ message: 'Food item deleted' })

    } catch (err) {
        next(err)
    }
}

async function updateHotel(req, res, next) {
    try {
        console.log('Routes: Update Hotel')

        let { name, address, hotelId } = req.body

        name = name?.trim()
        address = address?.trim()

        if (!hotelId) {
            return res.status(404).json({ message: 'Hotel Id is required' })
        }

        const hotelExist = await Hotel.findById(hotelId)

        if (!hotelExist) {
            return res.status(404).json({ message: "Hotel doesn't exist" })
        }

        console.log('name :>> ', name);
        console.log('address :>> ', address);
        console.log('req.file :>> ', req.file);

        // return 

        if (name && name !== hotelExist.name) {
            const duplicate = await Hotel.findOne({ name })
            if (duplicate) {
                return res.status(400).json({ message: 'Hotel name already exists ' })
            }
        }

        let imageUrl = hotelExist.image

        if (req.file) {
            if (hotelExist.image) {
                const publicId = `FoodOrderingWebSite/Hotel/${hotelExist.name}`
                console.log('publicId :>> ', publicId);

                await cloudinaryInstance.uploader.destroy(publicId)
                console.log('Image deleted')
            }

            imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
                folder: 'FoodOrderingWebSite/Hotel',
                public_id: name || hotelExist.name
            })).secure_url

        } else if (name && name !== hotelExist.name) {
            try {
                const renamed = (await cloudinaryInstance.uploader.rename(
                    `FoodOrderingWebSite/Hotel/${hotelExist.name}`,
                    `FoodOrderingWebSite/Hotel/${name}`
                ))
                imageUrl = renamed.secure_url
                console.log('Renamed successfully')
            } catch (err) {
                console.log('Error in renaming')
                console.log('err :>> ', err);
            }
        }

        const updateHotel = {
            name: name || hotelExist.name,
            address: address || hotelExist.address,
            image: imageUrl
        }

        const updated = await Hotel.findByIdAndUpdate(
            hotelId,
            { $set: updateHotel },
            { new: true }
        )

        res.status(200).json({ message: 'Hotel updated', data: updated })
    } catch (err) {
        next(err)
    }
}

async function updateFood(req, res, next) {
    try {

        console.log('Routes: Update Food')

        let { name, description, price, foodId } = req.body

        name = name?.trim()
        description = description?.trim()

        if (!foodId) {
            return res.status(400).json({ message: 'Food Id is required' })
        }

        const foodExist = await Food.findById(foodId)
        if (!foodExist) {
            return res.status(400).json({ message: "Food item doesn't exist" })
        }

        console.log('name :>> ', name);
        console.log('foodExit.name :>> ', foodExist.name);


        if (name && name !== foodExist.name) {
            const duplicate = await Food.findOne({ name })
            if (duplicate) {
                return res.status(400).json({ message: 'Food item with this name already exist' })
            }
        }

        let imageUrl = foodExist.image

        console.log('req.file :>> ', req.file);

        if (req.file) {
            if (foodExist.image) {
                const publicId = `FoodOrderingWebSite/Hotel/${foodExist.name}`
                console.log('publicId :>> ', publicId);

                await cloudinaryInstance.uploader.destroy(publicId)
                console.log('Image deleted')
            }

            imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
                folder: `FoodOrderingWebSite/Hotel`,
                public_id: name || foodExist.name,
            })).secure_url
            console.log('imageUrl :>> ', imageUrl);
        } else if (name && name !== foodExist.name) {
            try {
                const renamed = (await cloudinaryInstance.uploader.rename(
                    `FoodOrderingWebSite/Hotel/${foodExist.name}`,
                    `FoodOrderingWebSite/Hotel/${name}`
                ))
                imageUrl = renamed.secure_url

                console.log('Image renamed')
            } catch (err) {
                console.log('Error in renaming file')
                console.log('err :>> ', err);
            }
        }

        console.log('imageUrl :>> ', imageUrl);

        const updateFood = {
            name: name || foodExist.name,
            description: description || foodExist.description,
            price: price !== undefined ? price : foodExist.price,
            image: imageUrl
        }

        const updated = await Food.findByIdAndUpdate(
            foodId,
            { $set: updateFood },
            { new: true }
        )

        res.status(200).json({ message: 'Food Item updated', data: updated })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createHotel,
    getAllHotel,
    createFood,
    singleHotel,
    singleHotelFood,
    singleFood,
    getAllFood,
    getAllFoodAdmin,
    deleteHotel,
    deleteFood,
    updateHotel,
    updateFood
}