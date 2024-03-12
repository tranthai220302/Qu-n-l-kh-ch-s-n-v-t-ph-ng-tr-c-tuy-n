import configdb from "../../config/database.js";
import { Sequelize } from "sequelize";
import User from "./User.js";
import Role from "./Role.js";
import Category from "./Category.js";
import Image from "./Image.js";
import Review from "./Review.js";
import State from "./State.js";
import Admin from "./Admin.js";
import FeedBack from "./FeedBack.js";
import Address from "./Address.js";
import Hotel from "./Hotel.js";
import HotelOwner from "./HotelOwner.js";
import Services from "./Service.js";
import Room from "./Room.js";
import Item from "./Item.js";
import PriceRoom from "./PriceRoom.js";
import Booking from "./Booking.js";
import CityImg from "./City.js";
import Rating from "./Rating.js";
import CategoryRating from "./CategoryReview.js";
import Customer from "./Customer.js";
import Question from "./Question.js";
import CategoryItem from "./CategoryItem.js";
import Favourite from "./Favourite.js";
import BookingPriceRoom from "./BookingPriceRoom.js";
const sequelize = new Sequelize(
    configdb.DB,
    configdb.USER,
    configdb.PASSWORD,
    {
      host: configdb.HOST,
      dialect: configdb.dialect,
      operatorsAliases: 0,
  
      pool: {
        max: configdb.pool.max,
        min: configdb.pool.min,
        acquire: configdb.pool.acquire,
        idle: configdb.pool.idle
      },
      logging: false
    }
);
const db = {}
db.sequelize = sequelize
db.feedBack = FeedBack(sequelize);
db.admin = Admin(sequelize)
db.user = User(sequelize)
db.role = Role(sequelize)
db.category = Category(sequelize)
db.image = Image(sequelize)
db.state = State(sequelize)
db.review = Review(sequelize)
db.address = Address(sequelize)
db.hotel = Hotel(sequelize)
db.hotelOwner = HotelOwner(sequelize)
db.services = Services(sequelize)
db.room = Room(sequelize)
db.item = Item(sequelize);
db.price = PriceRoom(sequelize);
db.booking = Booking(sequelize);
db.imgCity = CityImg(sequelize);
db.rating = Rating(sequelize)
db.categoryRating = CategoryRating(sequelize)
db.customer = Customer(sequelize)
db.question = Question(sequelize)
db.categoryItem = CategoryItem(sequelize)
db.favourite = Favourite(sequelize)
db.bookingPriceRoom = BookingPriceRoom(sequelize)
//Asscociation
//user vs customer
db.customer.belongsTo(db.user);
db.user.hasOne(db.customer)
//user vs address
db.address.hasOne(db.user);
db.user.belongsTo(db.address)
//hotel vs vs address
db.address.hasOne(db.hotel);
db.hotel.belongsTo(db.address)
//hotel vs owner
db.hotel.belongsTo(db.hotelOwner);
db.hotelOwner.hasMany(db.hotel,{
  onDelete : 'CASCADE',
  onUpdate : 'CASCADE'
})
//hotel vs services
db.hotel.belongsToMany(db.services, {
  through : 'HotelServices',
  as : 'Services'
});
db.services.belongsToMany(db.hotel, {
  through : 'HotelServices',
  as : 'Hotel'
})
//hotel vs image
db.hotel.hasMany(db.image);
db.image.belongsTo(db.hotel);
//hotel vs room
db.hotel.hasMany(db.room,{
  onDelete : 'CASCADE',
  onUpdate : 'CASCADE'
});
//hotel vs booking
db.hotel.hasMany(db.booking);
db.booking.belongsTo(db.hotel)
db.room.belongsTo(db.hotel)
//room vs img
db.room.hasMany(db.image);
db.image.belongsTo(db.room)
//room vs item
db.room.belongsToMany(db.item,{
  through : 'RoomItem',
  as : 'Item'
})
db.item.belongsToMany(db.room,{
  through : 'RoomItem',
  as : 'Room'
})
//room vs category
db.room.belongsTo(db.category);
db.category.hasMany(db.room);
//room vs state
db.room.belongsTo(db.state);
db.state.hasMany(db.room);
//room vs price
db.room.hasMany(db.price);
db.price.belongsTo(db.room)
//priceroom vs booking
db.price.belongsToMany(db.booking,{
  through : db.bookingPriceRoom,
  as : 'booking'
})
db.booking.belongsToMany(db.price,{
  through : db.bookingPriceRoom,
  as : 'price'
})
//priceRoom vs review
db.price.hasMany(db.review);
db.review.belongsTo(db.price)
//owner vs user
db.hotelOwner.belongsTo(db.user);
db.user.hasOne(db.hotelOwner)
//review vs rating
db.review.hasMany(db.rating)
db.rating.belongsTo(db.review)
//rating vs categoryRating
db.rating.belongsTo(db.categoryRating);
db.categoryRating.hasMany(db.rating)
//review vs customer
db.customer.hasMany(db.review);
db.review.belongsTo(db.customer)
//customer vs booking
db.booking.belongsTo(db.customer);
db.customer.hasMany(db.booking);
//question vs customer
db.question.belongsTo(db.customer);
db.customer.hasMany(db.question);
//question vs hotel
db.question.belongsTo(db.hotel);
db.hotel.hasMany(db.question)
//feedback vs question
db.feedBack.belongsTo(db.question);
db.question.hasOne(db.feedBack);
//categoryItem vs item
db.item.belongsTo(db.categoryItem)
db.categoryItem.hasMany(db.item)
//favourite vs customer
db.customer.hasMany(db.favourite);
db.favourite.belongsTo(db.customer)
//favourite vs hotel
db.favourite.belongsTo(db.hotel);
db.hotel.hasMany(db.favourite);

export default db;
