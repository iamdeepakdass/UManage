import express from "express";
import { createClient } from "@supabase/supabase-js";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(morgan("combined"));

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

app.get("/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select();
  res.send(data);
});

app.get("/products/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select()
    .eq("id", req.params.id);
  console.log(error);
  res.send(data);
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

app.listen(3000, () => {
  console.log("This app is running on http://localhost:3000");
});
