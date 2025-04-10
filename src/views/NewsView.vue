<template>
  <v-container fluid class="pa-0">
    <div class="news-header">
      <h1>Новости</h1>
    </div>

    <div class="news-list">
      <div v-for="(item, index) in news" :key="index" class="news-item">
        <div class="news-card">
          <div class="news-image">
            <v-img :src="item.image" height="180" cover></v-img>
          </div>
          <div class="news-content">
            <div class="news-date">{{ item.date }}</div>
            <h2 class="news-title">{{ item.title }}</h2>
            <p class="news-excerpt">{{ item.excerpt }}</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <v-btn color="primary" variant="text">Все новости</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const news = ref([
  {
    date: '18 февраля 2022',
    title: 'How To',
    excerpt: 'Знаем Вы не цепи в заявке Добавить в панели расчет, учесть домены - цены не привязаны...',
    image: '/news1.jpg'
  },
  {
    date: '05 июня 2019',
    title: 'Бензин перестал приносить прибыль в России',
    excerpt: 'Прибыльность от продажи бензина на автозаправочных станциях (АЗС) снизилась в десять раз...',
    image: '/news2.jpg'
  },
  {
    date: '05 июня 2019',
    title: 'Пункты ПДД, которые водитель должен знать наизусть',
    excerpt: 'Правила дорожного движения предназначены для того, чтобы на наших дорогах не было каких и...',
    image: '/news3.jpg'
  },
  {
    date: '05 июня 2019',
    title: 'ТОП-5 автомобилей с самыми надежными кондиционерами',
    excerpt: 'Сейчас современный транспорт трудно представить без кондиционера. Особенно он актуальный...',
    image: '/news4.jpg'
  }
])
</script>

<style scoped>
.news-header {
  background-color: #fff;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.news-header h1 {
  font-size: 24px;
  margin: 0;
  color: #333;
}

.news-list {
  background-color: #f5f7fa;
  padding: 20px;
  min-height: calc(100vh - 120px);
}

.news-item {
  margin-bottom: 20px;
}

.news-card {
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.news-image {
  width: 180px;
  flex-shrink: 0;
}

.news-content {
  padding: 15px;
  flex-grow: 1;
}

.news-date {
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.news-title {
  font-size: 18px;
  margin: 0 0 10px;
  color: #0097a7;
}

.news-excerpt {
  color: #666;
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .news-card {
    flex-direction: column;
  }
  
  .news-image {
    width: 100%;
  }
}
</style>
