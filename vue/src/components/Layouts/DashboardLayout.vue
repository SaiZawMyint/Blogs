<template>
    <div class="w-full relative">
        <LeftMenu>
            <template v-slot:content>
                <slot name="leftPanel"></slot>
            </template>
        </LeftMenu>

        <div class="relative left-[30%] w-[70%] p-2">
            <slot name="base"></slot>
        </div>

        <!-- <RightMenu>
            <slot name:rightPanel></slot>
        </RightMenu> -->
    </div>
</template>

<script setup>
import Header from '../common/Header.vue';
import LeftMenu from './inc/LeftMenu.vue';
import RightMenu from './inc/RightMenu.vue';
</script>
