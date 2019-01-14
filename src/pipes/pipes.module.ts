import { NgModule } from '@angular/core';
import { FloorNamePipe } from './floor-name/floor-name';
import { TableNamePipe } from './table-name/table-name';
import { AreaNamePipe } from './area-name/area-name';
import { TimeServePipe } from './time-serve/time-serve';
@NgModule({
	declarations: [FloorNamePipe,
    TableNamePipe,
    AreaNamePipe,
    TimeServePipe],
	imports: [],
	exports: [FloorNamePipe,
    TableNamePipe,
    AreaNamePipe,
    TimeServePipe]
})
export class PipesModule {}
