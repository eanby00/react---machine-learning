import pandas as pd
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import model_from_json
import tensorflowjs as tfjs

# -------------------------------------------------------------------------------
# 데이터 기본 정보
# 이름: 아이리스 종 분류
# 회귀/분류: 분류
# loss 종류: categorical_crossentropy
# loss: 5.2651e-08, 0.000000052651
# 정확도: 1.0000
# 언어 종류: 파이썬
# 코드 링크: https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/iris_model/iris.py
# 데이터 출처: https://raw.githubusercontent.com/blackdew/tensorflow1/master/csv/iris.csv
# 설명: 아이리스 품종 분류
# 데이터 링크: https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data/iris.csv
# 모델 링크: https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/iris_model/model.json
# 독립 변수: 꽃잎길이 꽃잎폭 꽃받침길이 꽃받침폭
# 종속 변수: 품종_setosa 품종_versicolor 품종_virginica
# 샘플 데이터 링크: https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data/sample/iris.csv

# -------------------------------------------------------------------------------

## 데이터 불러오기
file_root = "https://raw.githubusercontent.com/blackdew/tensorflow1/master/csv/iris.csv"
iris = pd.read_csv(file_root)
print(iris.head())
print(iris.columns)

# 원핫인코딩
incoding = pd.get_dummies(iris)
print(incoding.head())
print(incoding.columns)

print(len(incoding))
training_iris = incoding.sample(frac=0.8)
print(training_iris.head())
test_iris = incoding.drop(training_iris.index)

# -------------------------------------------------------------------------------

## 저장된 모델 불러오기
json_file = open("./main/src/data_python/iris_model/iris.json", "r")
loaded_model_json = json_file.read()
json_file.close()

model = model_from_json(loaded_model_json)

model.load_weights("./main/src/data_python/iris_model/iris.h5")

# -------------------------------------------------------------------------------

# 강의의 데이터가 사라질 가능성이 있어서 따로 복사
# incoding.to_csv("iris.csv", index=False)
# incoding[1:6].to_csv("iris.csv", index=False, header=False)

# -------------------------------------------------------------------------------

# # 종속 변수, 독립 변수로 분리
# independent = training_iris[['꽃잎길이', '꽃잎폭', '꽃받침길이', '꽃받침폭']]
# dependent = training_iris[['품종_setosa', '품종_versicolor', '품종_virginica']]

# -------------------------------------------------------------------------------

# # 모델의 구조 제작
# X = tf.keras.layers.Input(shape=[4])

# H = tf.keras.layers.Dense(13)(X)
# H = tf.keras.layers.BatchNormalization()(H)
# H = tf.keras.layers.Activation("swish")(H)

# H = tf.keras.layers.Dense(13)(H)
# H = tf.keras.layers.BatchNormalization()(H)
# H = tf.keras.layers.Activation("swish")(H)

# H = tf.keras.layers.Dense(13)(H)
# H = tf.keras.layers.BatchNormalization()(H)
# H = tf.keras.layers.Activation("swish")(H)

# Y = tf.keras.layers.Dense(3, activation="softmax")(H)
# model = tf.keras.models.Model(X,Y)
# model.compile(loss="categorical_crossentropy", metrics="accuracy")

# ## 데이터로 모델 학습
# print("study start")
# model.fit(independent, dependent, epochs=100000, verbose=0)
# model.fit(independent, dependent, epochs=10)

# -------------------------------------------------------------------------------

## 모델의 수식 확인
# print(model.get_weights())

# -------------------------------------------------------------------------------

# # 모델 저장
# model_json = model.to_json()
# with open("main/src/data_python/iris_model/iris.json", "w") as json_file: json_file.write(model_json)

# model.save_weights("main/src/data_python/iris_model/iris.h5")

# # TF.js Layer 형식으로 내보내기
# tfjs.converters.save_keras_model(model, "./main/src/data_python/iris_model")

# -------------------------------------------------------------------------------

## 모델을 이용
test_iris = test_iris.reset_index(drop=False, inplace=False)
result_data_predict = pd.DataFrame(model.predict(test_iris[['꽃잎길이', '꽃잎폭', '꽃받침길이', '꽃받침폭']]), columns=['품종_setosa', '품종_versicolor', '품종_virginica'])

result_data = pd.DataFrame(test_iris[['품종_setosa', '품종_versicolor', '품종_virginica']], columns=['품종_setosa', '품종_versicolor', '품종_virginica'])
result_data["예측_setosa"] = result_data_predict["품종_setosa"]
result_data["예측_versicolor"] = result_data_predict["품종_versicolor"]
result_data["예측_virginica"] = result_data_predict["품종_virginica"]
result_data = result_data.round(2)
print(result_data)