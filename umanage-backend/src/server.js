import express from "express";
import { createClient } from "@supabase/supabase-js";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();

app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const supabase = createClient(
  "https://qqvnykfgyihednzkgygr.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxdm55a2ZneWloZWRuemtneWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5NzMxMTUsImV4cCI6MjAxNTU0OTExNX0.gZdoppejyhtJXRZw-i8Pvnpg_e6rgYxiodCUTeL2xn8"
);

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

app.post("/products", async (req, res) => {
  const { error } = await supabase.from("products").insert({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  if (error) {
    res.send(error);
  }
  res.send("created!!");
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
