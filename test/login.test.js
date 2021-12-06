import { Selector } from "testcafe";

fixture`Login test`.page`https://evermos.com/login/`;

const nomorTeleponInput = Selector(
  "#__layout > div > div:nth-child(3) > form > label:nth-child(1) > span.inputText__inner > input"
);
const passwordInput = Selector(
  "#__layout > div > div:nth-child(3) > form > label:nth-child(2) > span.inputText__inner > input"
);
const masukButton = Selector("button").withText("Masuk");
const voucherSection = Selector("#voucherSection__title").withText(
  "Kelas Pemula"
);
const alert = Selector(
  "#__layout > div > div:nth-child(3) > form > p"
).withText("Nomor ini belum terdaftar sebagai reseller");

const userProfile = Selector(
  "#__layout > div > div.appNav > div > a:nth-child(5)"
).withText("Akun");

const logoutButton = Selector(
  "#__layout > div > div:nth-child(7) > div > a:nth-child(5) > span"
).withText("Keluar Aplikasi");

test("Login with Registered Account & Logout", async (t) => {
  await t.setTestSpeed(0.5);
  await t.typeText(nomorTeleponInput, "081223334444");
  await t.typeText(passwordInput, "password");
  await t.click(masukButton);
  await t.expect(voucherSection.exists).ok;
  await t.click(userProfile);
  await t.expect(logoutButton.exists).ok();
  await t.click(logoutButton);
  await t.expect(nomorTeleponInput.exists).ok;
});

test("Login with Non-Registered Account", async (t) => {
  await t.setTestSpeed(0.5);
  await t.typeText(nomorTeleponInput, "12345678910");
  await t.typeText(passwordInput, "password111");
  await t.click(masukButton);
  await t.expect(alert.exists).ok;
});
