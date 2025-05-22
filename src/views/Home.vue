<script>
export default {
    name: 'Home',
    setup() {
        const visited_count = 1000;
        const images = [
        'https://lnovel.tw/uploads/https/xs.dmzj.com/img/1279/71/a95a412a90cf8c7b55dd9cd2ec2baf53.jpg.original.webp',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_FfAd7ExirZN83GGBMdWUbqXRhR7wlmafA&s./assets/S__8429588_0.jpg',
        'https://img.linetv.tw/large/drama/10003-poster.jpg',
        'https://lnovel.tw/uploads/https/xs.idmzj.com/img/webpic/0/lz0407l.jpg.small.webp',
        'https://p2.bahamut.com.tw/B/2KU/05/0001501805.JPG',
        ];
        return {
            images,
            visited_count,
        }
    },
};
</script>

<template>
    <div class="home">
        <a-layout>
            <a-layout-header>
                <a-carousel :style="{
                    width: '100%',
                    height: '80vh',
                }" :auto-play="true" indicator-type="dot" show-arrow="hover">
                    
                    <a-carousel-item v-for="image in images">
                        <img :src="image" class="carousel-image" />
                    </a-carousel-item>
                    
                </a-carousel>
            </a-layout-header>
            <a-layout-content style="padding: 24px">
                <h1>歡迎來到我的閱讀網站</h1>
                <p></p>
                
                <a-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
                    <div :style="{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }">
                    <!---
                        <a-statistic title="歷史訪問人數" :value="visited_count" :precision="0" :value-from="0" start="true"
                            animation>
                            <template #prefix>
                                <icon-user />
                            </template>
                            <template #suffix>人</template>
                        </a-statistic>
                    --->
                    </div>
                </a-card>
            </a-layout-content>
        </a-layout>

    </div>
</template>
<style scoped>
.home {
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.a-layout-header {
    flex: 0;
}

.a-layout-content {
    flex: 1;
    padding: 24px;
}

@media (max-width: 800px) {
    .a-layout-content{
        padding: 16px;
    }
}

.carousel-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 或 cover 看需求 */
  display: block;
  margin: 0 auto;
}

</style>