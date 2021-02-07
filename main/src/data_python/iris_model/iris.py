import pandas as pd
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import model_from_json
import tensorflowjs as tfjs

# -------------------------------------------------------------------------------
# 데이터 기본 정보
# 이름: 보스턴 집 값 예측
# 회귀/분류: 회귀
# loss 종류: mse
# loss: 3.9175
# 정확도: X
# 언어 종류: 파이썬
# 생성 날짜: 20210128
# 수정 날짜: 20210128
# {"id":15,"name":"보스턴 집 값 예측","type":"회귀","loss_type":"mse","loss":3.9175,"accuracy":"X"
# ,"language":"파이썬","date_create":"20210128","date_modify":"20210128","isDeleted":false,
# "deleted_date":0,"code":"https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/%EB%B3%B4%EC%8A%A4%ED%84%B4%EC%A7%91%EA%B0%92%EC%98%88%EC%B8%A1.py",
# "dataSource":"https://opentutorials.org/course/4570/28976","desc":"웹페이지 테스트및 개발 용도 + 처음 분석한 파일"}

# -------------------------------------------------------------------------------

## 데이터 불러오기
file_root = "https://raw.githubusercontent.com/blackdew/tensorflow1/master/csv/iris.csv"
iris = pd.read_csv(file_root)
print(iris.head())
print(iris.columns)

print(len(iris))
training_iris = iris.sample(frac=0.8)
print(training_iris.head())
test_iris = iris.drop(training_iris.index)

# -------------------------------------------------------------------------------

# ## 저장된 모델 불러오기
# json_file = open("./main/src/data_python/boston_model/boston.json", "r")
# loaded_model_json = json_file.read()
# json_file.close()

# model = model_from_json(loaded_model_json)

# model.load_weights("./main/src/data_python/boston_model/boston.h5")

# -------------------------------------------------------------------------------

# 강의의 데이터가 사라질 가능성이 있어서 따로 복사
iris.to_csv("iris.csv", index=False)

# -------------------------------------------------------------------------------

## 종속 변수, 독립 변수로 분리
# independent = training_boston[['crim', 'zn', 'indus', 'chas', 'nox', 'rm', 'age', 'dis', 'rad', 'tax', 'ptratio', 'b', 'lstat']]
# dependent = training_boston[["medv"]]

# -------------------------------------------------------------------------------

## 모델의 구조 제작
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

# 모델 저장
# model_json = model.to_json()
# with open("main/src/data_python/boston_model/boston.json", "w") as json_file: json_file.write(model_json)

# model.save_weights("main/src/data_python/boston_model/boston.h5")

# TF.js Layer 형식으로 내보내기
# tfjs.converters.save_keras_model(model, "./main/src/data_python/boston_model")

# -------------------------------------------------------------------------------

# ## 모델을 이용

# temp = np.ravel(model.predict(test_boston[['crim', 'zn', 'indus', 'chas', 'nox', 'rm', 'age', 'dis', 'rad', 'tax', 'ptratio', 'b', 'lstat']]), order="C")
# result_data_predict = pd.Series(temp)


# result_data = pd.DataFrame(test_boston[["medv"]].index, columns=["id"])
# result_data["예측한 값"] = result_data_predict
# temp = test_boston[["medv"]].reset_index()["medv"]
# result_data["실제 값"] = temp

# print(result_data)

# ---------------------------------------------------------------------------------------------------------------------------------------------------
# # 과거의 데이터 준비
# 파일경로 = "https://raw.githubusercontent.com/blackdew/tensorflow1/master/csv/iris.csv"
# 아이리스 = pd.read_csv(파일경로)
# print(아이리스.head())

# # 원핫인코딩
# 인코딩 = pd.get_dummies(아이리스)
# print(인코딩.head())
# print(인코딩.columns)

# 독립 = 인코딩[['꽃잎길이', '꽃잎폭', '꽃받침길이', '꽃받침폭']]
# 종속 = 인코딩[['품종_setosa', '품종_versicolor', '품종_virginica']]
# print(독립.shape, 종속.shape)

# # 모델의 구조 생성
# X = tf.keras.layers.Input(shape=[4])
# Y = tf.keras.layers.Dense(3, activation="softmax")(X)
# model = tf.keras.models.Model(X,Y)
# model.compile(loss="categorical_crossentropy", metrics="accuracy")

# # 데이터로 모델을 학습
# model.fit(독립, 종속, epochs=500)

# # 모델을 이용
# print(model.predict(독립[-5:]))
# print(종속[-5:])

# # 학습한 가중치
# print(model.get_weights())
# # 첫번째 열의 값들이 setosa를 구하는데 필요한 가중치와 편향