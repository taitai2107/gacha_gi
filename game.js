const readline = require("readline");
const util = require("util");
const { exec } = require("child_process");
const path = require("path");
// const axios = require("axios");
const execAsync = util.promisify(exec);
class GachaGame {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.roll = {
      count: 0,
      insure: 0,
      characters: [],
      Intertwined_Fate: 0,
    };
    this.date = new Date();
    //ngay/gio*phut
  }

  displayMenu() {
    console.log(
      "\x1b[36m%s\x1b[0m",
      "▲-----------------------------------------▲"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|►_◄       GACHA BANNER ARLECHINO      ►.◄|"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|-----------------------------------------|"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|          Lựa chọn 1  roll x 1           |"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|          Lựa chọn 2  roll x 5           |"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|          Lựa chọn 3  roll x 10          |"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|          Lựa chọn 4  roll x 20          |"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|          Lựa chọn 5  roll x 30          |"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|          Lựa chọn 6  xem kho nhân vật   |"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "|          Lựa chọn 7  nạp số lượng roll  |"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "▲-----------------------------------------▲"
    );
  }

  askForChoice() {
    this.rl.question("Nhập lựa chọn: ", (ans) => {
      switch (ans) {
        case "6":
          this.displayCharacters();
          break;
        case "7":
          this.addRolls();
          break;
        default:
          this.handleRolls(ans);
          break;
      }
    });
  }

  displayCharacters() {
    console.log("Danh sách các nhân vật của bạn:");
    this.roll.characters.forEach((char) => console.log(char));
    this.askForChoice();
  }

  addRolls() {
    this.rl.question("Nhập số lượng roll mà bạn muốn tăng: ", (choice) => {
      let numRolls = parseInt(choice);
      if (!isNaN(numRolls)) {
        this.roll.Intertwined_Fate += numRolls;
        console.log(
          `Số lượt roll của bạn hiện tại là ${this.roll.Intertwined_Fate}`
        );
      } else {
        console.log("Vui lòng nhập một số hợp lệ.");
      }
      this.askForChoice();
    });
  }

  handleRolls(ans) {
    const numericChoice = parseInt(ans);
    if (!isNaN(numericChoice) && numericChoice >= 1 && numericChoice <= 5) {
      console.log(`Bạn đã chọn op ${numericChoice}`);
      this.gacha(numericChoice);
    } else {
      console.log("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
    }
    this.askForChoice();
  }
  startUp = async () => {
    let video = path.join(
      "C:\\Users\\nguye\\Desktop\\nghich\\gacha\\5star-multi.mp4"
    );

    try {
      const { stdout, stderr } = await execAsync(`start ${video}`);
    } catch (error) {
      console.log(error);
    }
  };

  gacha(ans) {
    let characterUnrate = [
      "Keqing",
      "Mona",
      "Jean",
      "Diluc",
      "Qiqi",
      "Tighnari",
      "Dehya",
    ];
    let randomCharUnrate =
      characterUnrate[Math.floor(Math.random() * characterUnrate.length)];
    let characterRateUp = "Arlechino";
    let map = {
      1: 1,
      2: 5,
      3: 10,
      4: 20,
      5: 30,
    };

    const getPityRate = (pityCount) => {
      if (pityCount < 74) return 0.006;
      if (pityCount >= 90) return 1;
      return [
        0.0645, 0.123, 0.1814, 0.2399, 0.2983, 0.3568, 0.4153, 0.4738, 0.5322,
        0.5907, 0.6492, 0.7076, 0.7661, 0.8246, 0.883, 0.9415,
      ][pityCount - 74];
    };
    if (this.roll.Intertwined_Fate >= map[ans]) {
      for (let i = 0; i < map[ans]; i++) {
        let randomValue = Math.random();
        this.roll.count++;
        this.roll.Intertwined_Fate -= 1;
        let res = getPityRate(this.roll.count);

        console.log("lần roll thứ: " + this.roll.count);
        console.log(randomValue);

        if (randomValue <= res) {
          let mock = 50;
          let unOrLuck = Math.floor(Math.random() * 100);
          console.log(unOrLuck);
          if (mock <= unOrLuck || this.roll.insure == 1) {
            this.roll.characters.push(characterRateUp);
            this.roll.insure = 0;
            this.startUp();
            console.log("roll thành công " + characterRateUp);
            let pick =
              (Math.floor(Math.random() * this.roll.count) / unOrLuck) % 10;
            console.log(`roll lẻ tới  lần thứ ${Math.floor(pick * 10)}`);
          } else {
            this.roll.characters.push(randomCharUnrate);
            this.roll.insure = 1;
            this.startUp();
            console.log(`roll thành công ${randomCharUnrate}`);
          }

          this.roll.count = 0;
        }
      }
    }
    if (this.roll.Intertwined_Fate < map[ans]) {
      console.log(
        "nạp thêm roll hoặc chọn tùy chọn khác, số lượng roll không đủ"
      );
    }

    if (this.roll.count >= 90) {
      console.log("Guaranteed " + characterRateUp);
      this.roll.count = 0;
    }
  }

  run() {
    this.displayMenu();
    this.askForChoice();
  }
}

const game = new GachaGame();
game.run();
