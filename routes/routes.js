const {Router} = require('express'); 
const router = Router();
const fs = require('fs');

const carsFile = fs.readFileSync("./cars.json","utf8");
let cars = JSON.parse(carsFile);

router.get("/",(req,res)=>{
    res.json("Bienvenido a mi API");
});

router.get("/cars",(req,res)=>{
  res.status(200).json(cars);
});

router.post("/cars",(req,res)=>{
    
  const {PLACA,MARCA,MODELO,USUARIO} = req.body

  if(!PLACA || !MARCA || !MODELO || !USUARIO){
    res.status(401).json({error:"Por favor, diligencie todos los datos"});
  }else{

  const id = cars.length + 1;


  let  newCar = {
    id,
    PLACA,
    MARCA,
    MODELO,
    USUARIO
  };

  cars.push(newCar);
  const json_cars = JSON.stringify(cars);

  fs.writeFileSync("./cars.json", json_cars, "utf-8");

   res.status(200).json(cars);

  }
});

router.put("/cars/:id",(req,res)=>{

  const {PLACA,MARCA,MODELO,USUARIO} = req.body
  const id = req.params.id;
   
  if(!PLACA || !MARCA || !MODELO || !USUARIO || !id ){
    res.status(401).json({error:"Debe completar los datos y especificar el id."});
  }else{
     
    cars.filter((car)=>{

     if(car.id == id){
      car.PLACA = PLACA;
      car.MARCA = MARCA;
      car.MODELO = MODELO;
      car.USUARIO = USUARIO;
       
     }
    }); 

    const json_cars = JSON.stringify(cars);
    fs.writeFileSync("./cars.json",json_movies,"utf-8");

    res.status(200).json(cars);


  }

  

});


router.delete("/cars/:id",(req,res)=>{
    const id = req.params.id;

    if(!id){
      res.status(401).json({error: "Especifique un id"});
    }else{
      const indexCar = cars.findIndex((car) => car.id === id);
      cars.splice(indexCar,1);

      const json_cars = JSON.stringify(cars);
      fs.writeFileSync("./cars.json", json_cars,"utf-8");

      res.status(200).json(cars);

     
    }

});



module.exports = router;