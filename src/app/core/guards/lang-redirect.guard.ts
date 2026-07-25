import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

const SUPPORTED_LANGS = ['en', 'vi', 'ja'];

export const langRedirectGuard: CanActivateFn = (route) => {
    const router = inject(Router);
    const lang = route.paramMap.get('lang');

    if (!lang || !SUPPORTED_LANGS.includes(lang)) {
        router.navigate(['/en']);
        return false;
    }
    return true;
};