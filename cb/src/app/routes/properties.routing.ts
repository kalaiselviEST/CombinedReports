import { PropertiesComponent } from '../views/properties/properties.component';
import { CustomizeComponent } from '../views/properties/customize/customize.component';

export const PropertiesRoutes = {
  path: 'properties',
  component: PropertiesComponent,
  data: {
    breadcrumb: 'Properties'
  },
  children: [    
    {
      path: 'customize',
      component: CustomizeComponent,
      data: {
        breadcrumb: 'Customize'
      }
    }
  ]
};
