import { Routes } from '@angular/router';
import { generateNgxRoute } from 'ngx-route-manager';

/**
 * An object to manage all my routes used within the application 
 */
export const ngxRoutes = {
    dashboard: generateNgxRoute(),
    posts: generateNgxRoute('posts'),
    singlePost: generateNgxRoute('posts/:id'),
    albums: generateNgxRoute('albums'),
    singleAlbum: generateNgxRoute('albums/:id'),
    photos: generateNgxRoute('photos'),
    singlePhoto: generateNgxRoute('photos/:id'),
    singleUser: generateNgxRoute('users/:id')
}

export const routes: Routes = [
    {
        path: ngxRoutes.dashboard.path,
        loadComponent: () => import('./pages/dashboard/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent)
    },
    {
        path: ngxRoutes.singlePost.path,
        loadComponent: () => import('./pages/posts/post-detail/post-detail.component').then(m => m.PostDetailComponent)
    },
    {
        path: ngxRoutes.posts.path,
        loadComponent: () => import('./pages/posts/post-list/post-list.component').then(m => m.PostListComponent)
    },
    {
        path: ngxRoutes.singleAlbum.path,
        loadComponent: () => import('./pages/albums/album-detail/album-detail.component').then(m => m.AlbumDetailComponent)
    },
    {
        path: ngxRoutes.albums.path,
        loadComponent: () => import('./pages/albums/album-list/album-list.component').then(m => m.AlbumListComponent)
    },
    {
        path: ngxRoutes.singlePhoto.path,
        loadComponent: () => import('./pages/photos/photo-detail/photo-detail.component').then(m => m.PhotoDetailComponent)
    },
    {
        path: ngxRoutes.photos.path,
        loadComponent: () => import('./pages/photos/photo-list/photo-list.component').then(m => m.PhotoListComponent)
    },
    {
        path: ngxRoutes.singleUser.path,
        loadComponent: () => import('./pages/users/user-detail/user-detail.component').then(m => m.UserDetailComponent)
    },
];
