<script>
export default {
    name: 'Home',
    setup() {
        const visited_count = 1000;
        const images = [
        './assets/S__8429587_0.jpg',
        './assets/S__8429588_0.jpg',
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
                        <img :src="image" :style="{
                        width: '100%',
                            height: '100%',
                        }" />
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
</style>