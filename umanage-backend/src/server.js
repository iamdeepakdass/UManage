import express from "express";
import { createClient } from "@supabase/supabase-js";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";


if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(morgan("combined"));
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_APIKEY
);

app.get("/hello", async (req, res) => {
  const { data, error } = await supabase.rpc("hello_world");
  res.send(data);
});

app.get("/table/:table", async (req, res) => {
  const table = req.params.table;
  const { data, error } = await supabase.from(table).select();
  res.send(data);
});

app.get("/table/:table/:id", async (req, res) => {
  const table = req.params.table;
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id", req.params.id);
  console.log(error);
  res.send(data);
});

app.get("/getTableNames", async (req, res) => {
  try{
    const {data, error} = await supabase.rpc("get_table_names");
    res.send(data);
  } catch(e) {
    res.send(e);
  }
}) 

app.post('/addprimarykey/:tablename/:columnname',async(req,res)=>{
  const tableName=req.params["tablename"];
  const columnName=req.params["columnname"];

  try{
    const {data,error}= await supabase.rpc("add_primarykey",{
      t_name:tableName,
      columnname:columnName,

    });
    res.send(error);
  }catch(e){
    res.send(e);
  }
});


app.post('/dropprimarykey/:tablename',async(req,res)=>{
  const tableName=req.params["tablename"];

  try{
    const {data,error}=await supabase.rpc('drop_primarykey',{
      t_name:tableName,
    })

    res.send(error);

  }catch(e){
    res.send(e);
  }

});

app.post('/addrow', async (req, res) => {
  const tableName = 't_raghav';
  const columns = ['id', 'subjects'];
  const data = [2, 'mathematics'];

  try {
    // Construct the data object
    const rowData = {};
    columns.forEach((column, index) => {
      rowData[column] = data[index];
    });

    // Insert the row into the specified table
    const { error } = await supabase
      .from(tableName)
      .insert(rowData);

    

    console.log('Row inserted successfully:', rowData);
    if(error) res.status(500).json({ error: 'Error inserting row', message: error.message });
    else res.status(200).json({ message: 'Row inserted successfully', data: rowData });
  } catch (error) {
    console.error('Error inserting row:', error.message);
    res.status(500).json({ error: 'Error inserting row', message: error.message });
  }
});

app.post('/updaterow', async (req, res) => {
  const tableName = 't_raghav';
  const columns = ['id', 'subjects'];
  const data = [1, 'physics'];

  try {
    // Construct the data object
    const rowData = {};
    columns.forEach((column, index) => {
      rowData[column] = data[index];
    });

    // Insert the row into the specified table
    const { error } = await supabase
      .from(tableName)
      .update(rowData)
      .eq(columns[0], 1);

    

    console.log('Row updated successfully:', rowData);
    if(error) res.status(500).json({ error: 'Error updating row', message: error.message });
    else res.status(200).json({ message: 'Row updating successfully', data: rowData });
  } catch (error) {
    console.error('Error updating row:', error.message);
    res.status(500).json({ error: 'Error updating row', message: error.message });
  }
});

app.post('/deleterow', async (req, res) => {
  const tableName = 't_raghav';
  const columns = ['id'];
  const id = 2;

  try {

    // Insert the row into the specified table
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq(columns[0], id);

    

    console.log('Row deleted successfully!');
    if(error) res.status(500).json({ error: 'Error deleting row', message: error.message });
    else res.status(200).json({ message: 'Row deleted successfully' });
  } catch (error) {
    console.error('Error deleting row:', error.message);
    res.status(500).json({ error: 'Error deleting row', message: error.message });
  }
});


app.post("/signup", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: "iamdeepakdass@gmail.com",
      password: "Sumit@06",
    });
    res.send(error);
  } catch (e) {
    res.send(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "iamdeepakdass@gmail.com",
      password: "Sumit@06",
    });
    res.send(error);
  } catch (e) {
    res.send(e);
  }
});

app.post("/createtable/:tablename", async (req, res) => {
  const table_name = req.params["tablename"];
  try {
    const { data, error } = await supabase.rpc("create_table", {
      t_name: table_name,
    });
    res.send(error);
  } catch (e) {
    res.send(e);
  }
});
app.post("/droptable/:tablename", async (req, res) => {
  const table_name = req.params["tablename"];
  try {
    const { data, error } = await supabase.rpc("drop_table", {
      t_name: table_name,
    });
    res.send(error);
  } catch (e) {
    res.send(e);
  }
});
app.post("/showcolumn/:tablename", async (req, res) => {
  const table_name = req.params["tablename"];
  try {
    const { data, error } = await supabase.rpc("show_columns", {
      t_name: table_name,
    });
    res.send(data);
  } catch (e) {
    res.send(e);
  }
});

app.post("/renamecolumn/:tablename/:columnname/:rename", async (req, res) => {
  const table_name = req.params["tablename"];
  const column_name = req.params["columnname"];
  const re_name = req.params["rename"];

  try {
    const { data, error } = await supabase.rpc("rename_column", {
      t_name: table_name,
      columnname: column_name,
      renamedname: re_name,
    });
    res.send(error);
  } catch (e) {
    res.send(e);
  }
});

app.post("/dropcolumn/:tablename/:columnname", async (req, res) => {
  const table_name = req.params["tablename"];
  const column_name = req.params["columnname"];

  try {
    const { data, error } = await supabase.rpc("drop_column", {
      t_name: table_name,
      columnname: column_name,
    });
    res.send(error);
  } catch (e) {
    res.send(e);
  }
});

app.post("/addcolumn/:tablename/:columnname/:dtype", async (req, res) => {
  const table_name = req.params["tablename"];
  const column_name = req.params["columnname"];
  const data_type = req.params["dtype"];

  try {
    const { data, error } = await supabase.rpc("add_column", {
      t_name: table_name,
      columnname: column_name,
      datatype: data_type,
    });
    res.send(error);
  } catch (e) {
    res.send(e);
  }
});

app.post("/altercolumn/:tablename/:columnname/:dtype", async (req, res) => {
  const table_name = req.params["tablename"];
  const column_name = req.params["columnname"];
  const data_type = req.params["dtype"];

  try {
    const { data, error } = await supabase.rpc("alter_column_datatype", {
      t_name: table_name,
      columnname: column_name,
      datatype: data_type,
    });
    res.send(error);
  } catch (e) {
    res.send(e);
  }
});

app.post("/insert/:tablename", async (req, res) => {
  async function insertRow(tableName, columnNames, columnData) {
    try {
      const data = {};

      // Create an object with column names as keys and corresponding data
      for (let i = 0; i < columnNames.length; i++) {
        data[columnNames[i]] = columnData[i];
      }

      // Insert the data into the specified table
      const { data: insertedRow, error } = await supabase
        .from(tableName)
        .upsert([data]);

      if (error) {
        console.error("Error inserting row:", error.message);
      } else {
        console.log("Row inserted successfully:", insertedRow);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const table_name=req.params["tablename"];
  const column_name=["id","subjects"];
  const data=["1","math"];

  await insertRow(table_name,column_name,data);



});

app.post("/products", async (req, res) => {
  const { error } = await supabase.from("products").insert({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  if (error) {
    res.send(error);
  } else {
    res.send("created!!");
  }
});

app.post("/create", async (req, res) => {
  try {
    const { tableName, columns } = req.body;
    const createTableSQL = `CREATE TABLE ${tableName} (${columns})`;

    const { error } = await supabase.rpc("execute", { sql: createTableSQL });

    if (error) {
      res.send(error);
    } else {
      res.send("table created");
    }
  } catch (error) {
    res.send(error);
  }
});

app.put("/products/:id", async (req, res) => {
  const { error } = await supabase
    .from("products")
    .update({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    })
    .eq("id", req.params.id);
  if (error) {
    res.send(error);
  }
  res.send("updated!!");
});

app.delete("/products/:id", async (req, res) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", req.params.id);
  if (error) {
    res.send(error);
  }
  res.send("deleted!!");
});

app.get("/", (req, res) => {
  res.send("Hello I am working my friend Supabase <3");
});

app.get("*", (req, res) => {
  res.send("Hello again I am working my friend to the moon and behind <3");
});

const port = 8000

app.listen(port, () => {
  console.log(`This app is running on http://localhost:${port}`);
});
