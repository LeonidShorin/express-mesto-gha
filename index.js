const { PORT = 3000 } = process.env;

// eslint-disable-next-line no-undef
const app = express();

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
