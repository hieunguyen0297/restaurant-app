const express = require('express');
const router = express.Router();
const db = require('../DB/index');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

//NO NEED TO CHECK FOR VALID ID, just extra step

//get all restaurants
router.route('/').get( async(req, res) => {

    const data = await db.query("select * from restaurants order by id");
    
    res.status(200).json({Status: 'Success', result: data.rows.length ,data: data.rows});
    
    
    
     
});

//get 1 restaurant by their ID
router.get('/:id', async (req, res) => {
    try{
        const data = await db.query(`select * from restaurants where id = ${req.params.id}`);
   
        res.status(200).json({Status :  'Success'  , data: data.rows});
        
    //whatever error will be caught down here
    }catch (err){
        res.json({Error: err.message});
    }
    
    
})


//get 1 restaurant by their NAME
// router.get('/', async (req, res) => {
    
//     const queryObject = url.parse(req.url,true).query;
//     console.log(queryObject);
    
    
// })



//Create  a restaurant
router.post('/', async (req, res, next) => {
    try{
        const data = await db.query("insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({data});

    }catch (err){
        res.status(400).json({Message: err.message});
        next();
    }
    
    
})


//update a data in the restaurant
router.put('/:id', async (req, res, next) => {
    try{
        const data = await db.query(`select * from restaurants where id = ${req.params.id}`);
        
        //there is no need to check for id 
        if(data.rows.length <= 0){
           res.status(404).json({Message: 'not found'}) 
        }else{
            const updatedData = await db.query(
            `UPDATE restaurants SET name = $1, location =$2, price_range = $3 where id = ${req.params.id}`,[req.body.name, req.body.location, req.body.price_range]
            );

            res.status(200).json({Status: 'Success', Message: 'The data has been updated'});
        };

        
    }catch (err){
        res.json({Error: err.message});
        next();
    }
    
})


//delete the restaurant
router.delete('/:id', async (req, res, next) => {
    try{
        const data = await db.query("delete from restaurants where id = $1",[req.params.id])
        res.status(200).json({data: data})
    }catch (err){
        res.status(200).json({Error: err.message});
        next();
    }
})



//post review route

router.post('/review/:id', async (req, res, next) => {
    try{
        const response = await db.query(`insert into reviews (restaurant_id, reviewer, description, rating) values ($1, $2, $3, $4) returning *`, [req.params.id, req.body.reviewer, req.body.description, req.body.rating]);
        res.status(200).json({data: response.rows});
    }catch (err) {
        console.log(err);
        next();
    }
    
})


//get all reviews for 1 restaurant
router.get('/reviews/:id' , async (req, res, next) => {
    try{
        const response = await db.query(`select review_id, reviewer, description, rating from reviews where restaurant_id = ${req.params.id}`)
        res.status(200).json({data: response.rows});
    }catch (err){
        console.log(err);
        next();
    }
    
})


//register user
router.post('/register', async (req, res, next) => {
    try{
        let { first_name, last_name, email, password } = req.body;
        
        if(first_name == '' || last_name == '' || email == '' || password == ''){
            res.json({message: 'Please fillout the form'});
           
        }

        const checkEmail = await db.query('select * from users where email = $1', [email]);
        if (checkEmail.rows.length > 0){
            res.json({message: "Email is already exist"});
           
        }else{
            
            let salt = await bcrypt.genSalt(10);
            
            password = await bcrypt.hash(password, salt);
            const data = await db.query('insert into users (first_name, last_name, email, password) values ($1, $2, $3, $4) returning *',[first_name, last_name, email, password]);

            res.status(201).json({data})
            

            data.save();
           
            
        }

       
    }catch (err){
        console.log(err);
        next();
    }
    


})


//login
router.post('/login', async (req, res, next) => {
    try{
        let { email, password } = req.body;
    
        const result = await db.query('select * from users where email = $1 ', [email]);
        // res.json({result})
        if(result.rowCount == 0){
            res.json({message: 'Email not found !'});
            
        }else if( result.rowCount  > 0){
         
            if(await bcrypt.compare(password, result.rows[0].password)){
            
                const id = result.rows[0].id;

                const token = jwt.sign({id: id}, process.env.JWT_SECRET);
                
                res.json({result, token})
                
            }else{
                res.status(400).json({message: 'Email or password is incorrect !'})

            }
           
        }

        

        // password = await bcrypt.compare(password, result.rows[0].password);

        

    }catch (err){
        console.log(err);
        next()
    }
})








module.exports = router;