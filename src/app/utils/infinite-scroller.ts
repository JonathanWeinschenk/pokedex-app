import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, map, Observable, Subscription } from "rxjs";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class InfiniteScroller<T> extends DataSource<Record<string, T>> {
	private readonly _http = inject(HttpClient);

	private readonly _url: string;
	private readonly _pageSize = 10;

	private _length = 0;
	private _fetchedPages = new Set<number>();
	private _cachedData = Array<Record<string, T>>();

	private readonly _dataStream = new BehaviorSubject<(Record<string, T>)[]>(this._cachedData);
	private readonly _subscription = new Subscription();

	constructor(url: string) {
		super();
		this._url = url;
	}

	connect(collectionViewer: CollectionViewer): Observable<(Record<string, T>)[]> {
		this._subscription.add(
			collectionViewer.viewChange.subscribe((range) => {
				const startPage = this._getPageForIndex(range.start);
				const endPage = this._getPageForIndex(range.end - 1);

				for (let i = startPage; i <= endPage; i++) {
					this._fetchPage(i);
				}
			})
		);
		this._fetchPage(0);

		return this._dataStream;
	}

	disconnect(): void {
		this._subscription.unsubscribe();
	}

	private _getPageForIndex(index: number): number {
		return Math.floor(index / this._pageSize);
	}

	private _fetchPage(page: number) {
		if (this._fetchedPages.has(page)) {
			return;
		}
		this._fetchedPages.add(page);

		const params = {
			params: {
				offset: page * this._pageSize,
				limit: this._pageSize
			}
		};

		this._http.get<{ count: number, results: Record<string, T>[] }>(this._url, params)
			.pipe(
				map((response) => {
					if (this._length === 0) {
						this._length = response.count;
						this._cachedData = Array.from<Record<string, T>>({ length: this._length });
					} else {
						this._cachedData.length = response.count;
					}

					return response.results;
				})
			)
			.subscribe((data) => {
				this._cachedData.splice(
					page * this._pageSize,
					this._pageSize,
					...data
				);
				this._dataStream.next(this._cachedData);
			});
	}
}
