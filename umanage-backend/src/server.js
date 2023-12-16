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
