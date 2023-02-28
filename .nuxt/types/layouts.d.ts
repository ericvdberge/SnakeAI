import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "D:/Fontys/Semester 7 - Advanced AI/Snake/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}