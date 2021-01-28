import pandas as pd
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import model_from_json

# -------------------------------------------------------------------------------

## 데이터 불러오기
file_root = "https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/data/boston.csv"
boston = pd.read_csv(file_root)
print(boston.columns)
print(boston.head())

print(len(boston))
training_boston = boston.sample(frac=0.8)
print(training_boston.head())
test_boston = boston.drop(training_boston.index)

# -------------------------------------------------------------------------------

## 저장된 모델 불러오기
json_file = open("./main/src/data_python/model/boston.json", "r")
loaded_model_json = json_file.read()
json_file.close()

model = model_from_json(loaded_model_json)

model.load_weights("./main/src/data_python/model/boston.h5")

# -------------------------------------------------------------------------------

# ## 강의의 데이터가 사라질 가능성이 있어서 따로 복사
# # boston.to_csv("boston.csv", index=False)

# -------------------------------------------------------------------------------

# ## 종속 변수, 독립 변수로 분리
# independent = training_boston[['crim', 'zn', 'indus', 'chas', 'nox', 'rm', 'age', 'dis', 'rad', 'tax', 'ptratio', 'b', 'lstat']]
# dependent = training_boston[["medv"]]

# -------------------------------------------------------------------------------

# ## 모델의 구조 제작
# X = tf.keras.layers.Input(shape=[13])

# H = tf.keras.layers.Dense(13)(X)
# H = tf.keras.layers.BatchNormalization()(H)
# H = tf.keras.layers.Activation("swish")(H)

# H = tf.keras.layers.Dense(13)(H)
# H = tf.keras.layers.BatchNormalization()(H)
# H = tf.keras.layers.Activation("swish")(H)

# H = tf.keras.layers.Dense(13)(H)
# H = tf.keras.layers.BatchNormalization()(H)
# H = tf.keras.layers.Activation("swish")(H)

# Y = tf.keras.layers.Dense(1)(H)
# model = tf.keras.models.Model(X,Y)
# model.compile(loss="mse")

# ## 데이터로 모델 학습
# model.fit(independent, dependent, epochs=10000, verbose=0)
# model.fit(independent, dependent, epochs=10)

# -------------------------------------------------------------------------------

## 모델의 수식 확인
# print(model.get_weights())

# -------------------------------------------------------------------------------

## 모델 저장
# model_json = model.to_json()
# with open("boston.json", "w") as json_file: json_file.write(model_json)

# model.save_weights("boston.h5")

# -------------------------------------------------------------------------------

## 모델을 이용
# print(model.predict(test_boston[['crim', 'zn', 'indus', 'chas', 'nox', 'rm', 'age', 'dis', 'rad', 'tax', 'ptratio', 'b', 'lstat']]))
# print(test_boston[["medv"]])



temp = np.ravel(model.predict(test_boston[['crim', 'zn', 'indus', 'chas', 'nox', 'rm', 'age', 'dis', 'rad', 'tax', 'ptratio', 'b', 'lstat']]), order="C")
result_data_predict = pd.Series(temp)
temp = test_boston[["medv"]].reset_index()["medv"]

result_data = pd.DataFrame(result_data_predict, columns=["예측한 값"])
result_data["실제 값"] = temp

print(result_data)