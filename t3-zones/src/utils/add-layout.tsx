import { Layout } from "../pages/components/form/layout";

export function addLayout(Component: any) {
    Component.getLayout = function getLayout(page: any) {
        return (
          <Layout>
            {page}
          </Layout>
        )
      }
    return Component;
}