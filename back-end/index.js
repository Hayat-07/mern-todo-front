const express =require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {MongoClient, ObjectId} = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;


//------------------Middle were--------------------//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//---------------------REST API---------------------//
const uri ='mongodb+srv://hayat:hayat@cluster1.p3sclim.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);

const run = async ()=>{

     const taskCollection =await client.db('todo-app').collection('task-collection');


            try {
                app.post('/postT',async (req,res)=>{

                    const body = req.body;
                    // console.log(body);
                    const  result = await taskCollection.insertOne(body);
                    res.send(result);
                    // console.log(taskCollection);

                })
                app.get('/getT',async (req,res)=>{

                    const cursor = taskCollection.find({});
                    const tasksData =await cursor.toArray();
                    // console.log(tasksData);

                    res.send(tasksData);


                })
                app.delete("/deleteT/:id", async (req,res)=>{

                        const id =req.params.id;
                        console.log(id);
                        const query =  {_id :new ObjectId(id)};
                     const result= await taskCollection.deleteOne(query);
                       // console.log(result);
                          res.send(result);


                })
                app.put("/put/:id", async (req,res)=>{

                        const id =req.params.id;
                        console.log(id);
                        const body = req.body;
                        const option = {upsert:true};
                        const filter =  {_id :new ObjectId(id)};
                        const updatedBody = {
                            $set:{
                                date: body.date,
                                task : body.task,
                                cost: body.cost
                            }
                        }
                     const result= await taskCollection.updateOne(filter,updatedBody,option);
                     // console.log(result);

                          res.send(result);


                })
            }
            finally {

            }





}
run();




//---------------server listening------------------//
app.listen(port,()=> console.log(`Server is running on port == ${port}`));