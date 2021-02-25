## IQR 방식을 이용한 데이터 전처리
## 지식 출처: https://wikidocs.net/16582

import pandas as pd
import numpy as np

file_root = "./main/src/data/health_height_and_weight_preprocessing.csv"
save_root = "./main/src/data/height_and_weight_Preprocessing.csv"

data = pd.read_csv(file_root, header=None, names=["height", "weight"]) ## 출처에서 데이터를 다운받은 후 키와 몸무게의 데이터만 남긴 것
# print(data)
print(data.describe())

# ---------------------------------------------------------------------------------------------------------

## weight 이상치 제거

quartile_weight_1, quartile_weight_3 = np.percentile(data["weight"], [25, 75])
iqr = quartile_weight_3 - quartile_weight_1

lower_weight_bound = quartile_weight_1 - (iqr * 1.5)
upper_weight_bound = quartile_weight_3 + (iqr * 1.5)
data_replace = data[(data["weight"] < upper_weight_bound) & (data["weight"] > lower_weight_bound)]

print("\n---------------- weight 이상치 제거 후 ------------------\n")
# print(data_replace)
print(data_replace.describe())

# ---------------------------------------------------------------------------------------------------------

## height 이상치 제거

quartile_height_1, quartile_height_3 = np.percentile(data["height"], [25, 75])
iqr = quartile_height_3 - quartile_height_1

lower_height_bound = quartile_height_1 - (iqr * 1.5)
upper_height_bound = quartile_height_3 + (iqr * 1.5)
data_replace = data_replace[(data_replace["height"] < upper_height_bound) & (data_replace["height"] > lower_height_bound)]

print("\n---------------- height 이상치 제거 후 ------------------\n")
# print(data_replace)
print(data_replace.describe())



## 데이터 랜덤으로 제거(데이터가 너무 많아 모델 생성에 걸리는 시간 감소를 위함)

sample = data_replace.sample(frac=0.001)

print(sample.describe())
sample.to_csv(save_root, index=False)