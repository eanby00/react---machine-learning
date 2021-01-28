import pandas as pd
import tensorflow as tf

# -------------------------------------------------------------------------------

## 데이터 불러오기
file_root = "https://raw.githubusercontent.com/blackdew/tensorflow1/master/csv/boston.csv"
boston = pd.read_csv(file_root)
print(boston.columns)
print(boston.head())

# -------------------------------------------------------------------------------

## 강의의 데이터가 사라질 가능성이 있어서 따로 복사
# boston.to_csv("boston.csv", index=False)

# -------------------------------------------------------------------------------

## 종속 변수, 독립 변수로 분리
independent = boston[['crim', 'zn', 'indus', 'chas', 'nox', 'rm', 'age', 'dis', 'rad', 'tax', 'ptratio', 'b', 'lstat']]
dependent = boston[["medv"]]

## 저장된 모델 불러오기
# model = tf.keras.models.load_model("boston.h5")

# -------------------------------------------------------------------------------

## 모델의 구조 제작
X = tf.keras.layers.Input(shape=[13])

H = tf.keras.layers.Dense(13)(X)
H = tf.keras.layers.BatchNormalization()(H)
H = tf.keras.layers.Activation("swish")(H)

H = tf.keras.layers.Dense(13)(H)
H = tf.keras.layers.BatchNormalization()(H)
H = tf.keras.layers.Activation("swish")(H)

H = tf.keras.layers.Dense(13)(H)
H = tf.keras.layers.BatchNormalization()(H)
H = tf.keras.layers.Activation("swish")(H)

Y = tf.keras.layers.Dense(1)(H)
model = tf.keras.models.Model(X,Y)
model.compile(loss="mse")

## 데이터로 모델 학습
model.fit(independent, dependent, epochs=10000, verbose=0)
model.fit(independent, dependent, epochs=10)

# -------------------------------------------------------------------------------

## 모델을 이용
print(model.predict(independent[0:5]))
print(dependent[0:5])

# -------------------------------------------------------------------------------

## 모델의 수식 확인
# print(model.get_weights())

# -------------------------------------------------------------------------------

## 모델 저장
model_json = model.to_json()
with open("boston.json", "w") as json_file: json_file.write(model_json)

model.save_weights("boston.h5")