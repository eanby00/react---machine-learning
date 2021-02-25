import pandas as pd
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import model_from_json
import tensorflowjs as tfjs


# -------------------------------------------------------------------------------
# 이름: 건강검진정보 키와 몸무게_전처리
# 회귀/분류: 회귀
# loss 종류: mse
# loss: 78.4890
# 정확도: X
# 언어 종류: 파이썬
# 코드 링크: https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/health_height_and_weight%20Preprocessing/height_and_weight.py
# 데이터 출처: https://www.data.go.kr/data/15007122/fileData.do
# 설명: 기존의 모델 향상을 위해 데이터 전처리 적용 버전, 성능 향상이 있었으나 실제 사용하기에는 힘든 loss 값을 보여줌
# 데이터 링크: https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/health_height_and_weight%20Preprocessing/height_and_weight_Preprocessing.csv
# 모델 링크: https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/health_height_and_weight%20Preprocessing/model.json
# 독립 변수: height
# 종속 변수: weight
# 샘플 데이터 링크: https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/health_height_and_weight%20Preprocessing/sample.csv

# -------------------------------------------------------------------------------

## 데이터 불러오기
file_root = "https://raw.githubusercontent.com/eanby00/react-machine-learning/master/main/src/data_python/health_height_and_weight%20Preprocessing/height_and_weight_Preprocessing.csv"
data = pd.read_csv(file_root)
print(data.columns)
print(data.head())

print(len(data))
training_data = data.sample(frac=0.8)
print(training_data.head())
test_data = data.drop(training_data.index)

# -------------------------------------------------------------------------------

# ## 저장된 모델 불러오기/
# json_file = open("./main/src/data_python/health_height_and_weight/height_and_weight.json", "r")
# loaded_model_json = json_file.read()
# json_file.close()

# model = model_from_json(loaded_model_json)

# model.load_weights("./main/src/data_python/health_height_and_weight/height_and_weight.h5")

# -------------------------------------------------------------------------------

# -------------------------------------------------------------------------------

# 종속 변수, 독립 변수로 분리
independent = training_data[["height"]]
dependent = training_data[["weight"]]

# -------------------------------------------------------------------------------

# 모델의 구조 제작
X = tf.keras.layers.Input(shape=[1])

H = tf.keras.layers.Dense(10)(X)
H = tf.keras.layers.BatchNormalization()(H)
H = tf.keras.layers.Activation("swish")(H)

H = tf.keras.layers.Dense(10)(H)
H = tf.keras.layers.BatchNormalization()(H)
H = tf.keras.layers.Activation("swish")(H)

H = tf.keras.layers.Dense(10)(H)
H = tf.keras.layers.BatchNormalization()(H)
H = tf.keras.layers.Activation("swish")(H)

Y = tf.keras.layers.Dense(1)(H)
model = tf.keras.models.Model(X,Y)
model.compile(loss="mse")

## 데이터로 모델 학습
model.fit(independent, dependent, epochs=100000, verbose=0)
model.fit(independent, dependent, epochs=10, verbose=1)

# -------------------------------------------------------------------------------

# 모델 저장 - TF.js Layer 형식으로 내보내기
tfjs.converters.save_keras_model(model, "./main/src/data_python/health_height_and_weight Preprocessing")

# -------------------------------------------------------------------------------

# ## 모델을 이용
# test_data = test_data.reset_index(drop=False, inplace=False)
# result_data_predict = pd.DataFrame(model.predict(test_data["height"]), columns=["weight"])

# result_data = pd.DataFrame(test_data["weight"], columns=["weight"])
# result_data["예측_weight"] = result_data_predict["weight"]
# result_data = result_data.round(2)
# print(result_data)