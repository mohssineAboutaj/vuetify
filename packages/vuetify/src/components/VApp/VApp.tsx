// Styles
import './VApp.sass'

// Composables
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { createLayout, makeLayoutProps } from '@/composables/layout'

// Utilities
import { defineComponent, useRender } from '@/util'
import { useRtl } from '@/composables/rtl'

export const VApp = defineComponent({
  name: 'VApp',

  props: {
    ...makeLayoutProps({ fullHeight: true }),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const theme = provideTheme(props)
    const { layoutClasses, getLayoutItem, items } = createLayout(props)
    const { rtlClasses } = useRtl()

    useRender(() => (
      <div
        class={[
          'v-application',
          theme.themeClasses.value,
          layoutClasses.value,
          rtlClasses.value,
        ]}
        data-app="true"
      >
        <div class="v-application__wrap">
          { slots.default?.() }
        </div>
      </div>
    ))

    return {
      getLayoutItem,
      items,
      theme,
    }
  },
})

export type VApp = InstanceType<typeof VApp>