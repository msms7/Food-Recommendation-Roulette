from flask import Flask, render_template

app = Flask(__name__)

FOOD_MESSAGES = {
    "김밥": "김밥 먹고 인생 말면 안 된다~",
    "떡볶이": "엽떡 땡긴다ㅠㅠ",
    "삼겹살": "기름기 봐라 ㄷㄷ",
    "라면": "밥 말아서 국물까지 군침 돈다",
    "치킨": "치느님은 못 참지~",
    "김치찌개": "울 할머니가 진짜 잘했는데 ㅠㅠ",
    "불고기": "급식에 이거 나오면 두 그릇 먹음ㅋㅋ",
    "된장찌개": "고깃집 된찌가 겁나 맛있는데",
    "비빔밥": "전주 비빔밥 맛있겠노",
    "떡국": "설날에 왜 떡국먹는 거지?",
    "짜장면": "밥까지 비벼서 먹고 싶다ㅠㅠ",
    "스팸": "밥 한 숟가락 떠서 올려 먹으면 세상 다 가진 기분인데 ㅋㅋ",
    "부대찌개": "군대 생각나서 짜증나네",
    "삼계탕": "이열치열이라고 하는데 난 이해 못 함ㅋㅋ",
    "김치전": "김치전에 막걸리하고 싶음",
    "국밥": "이거 잘못 먹으면 입천장 아작 남 ㅋㅋ"
}

@app.route("/")
def index():
    foods = list(FOOD_MESSAGES.keys())
    return render_template("index.html", foods=foods, food_messages=FOOD_MESSAGES)

if __name__ == "__main__":
    app.run(debug=True)


