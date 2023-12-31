@extends('layout.layout')
@section('header')
{{--  <h3>busqueda</h3>  --}}
<div class="container bg-light">
    <h2>
    {{--  {{$searchExists}}  --}}
    {{--  {{$search}}  --}}

    </h2>
    {{--  dd($search)  --}}
    @php

    @endphp
    {{--  @if ($searchExists ===1  )  --}}
    @if ($searchExists === false )
    <div class="d-flex justify-content-center">

        <div class="box-search-validar p-3 text-center">
            {{--  <h4>Tu búsqueda de “dfadfafda” no arrojó resultados</h4>  --}}
            <h4>Tu búsqueda no se encontro</h4>
        </div>
    </div>
    @endif
    <div class="row mb-4 slay--carusel p-4">
        @foreach ($slaySearch as $slaySearch )

      <div class="col text-center  box-slay-search">
        <a href="{{route('View.home.index', $id=$slaySearch->id)}}">
        <img src="{{asset('storage/img/Productos/'.$slaySearch->imagen.'')}}" class="card-img-top" width="200px"/>
        <h5 class="card-title h6 text-dark">{{$slaySearch->nombre}}</h5>
    </a>
    </div>
        @endforeach
    </div>

 <div class="row row-cols-2 row-cols-md-6">
@foreach ($search as $itemSearch)
     {{--  <h6>{{$itemSearch->nombre}}</h6>  --}}
     <div class="col mb-5 ">
       <div class="card  box-efect box-love" >
       {{--  <div class="overlay icons--love--font">
         <a  onclick="return love();" class="icon icons--font-love "  ><i class="bi bi-heart"></i></a>
        </div>  --}}

        <div class="card shadow box--search--yes">
      <div class="">
            <a href="{{route('View.home.index', $id=$itemSearch->id)}}">
            <img src="{{asset('storage/img/Productos/'.$itemSearch->imagen.'')}}" class="card-img-top" width="200px"/>
        </a>
        </div>
          <div class="card-body">
            <div class="d-flex  align-items-center ">
                                          <h5 class="card-title h6 title--box--pro">{{$itemSearch->nombre}}</h5>
                                      </div>
                                   <div class="mb-1 mb-md-0 d-flex justify-content-between  ">
                                   <span class="box--text--pre"><del>S/ {{number_format($itemSearch->precio, 2, ".", ",")}}</del></span>
                                   <span class="box--text--pre">S/ {{number_format($itemSearch->newPrecio, 2, ".", ",")}}</span>
                                        </div>
            <div class=" align-items-center d-flex ">
     <span class="h6 mb-0 text-muted fw-normal">

     <small class="box--text--pre">{{$itemSearch->cantidad}} disponibles </small>  </span>
     </div>
       <hr>
            <div class="d-flex justify-content-between align-items-center">
                <div class="col-12 btn-group d-flex justify-content-center">
                    {{--  <a href="view-page.php?id_view=<?php echo $item['db_id'] ?>" class="btn btn-sm btn-outline-secondary">Ver</a>  --}}
        @if (session()->exists('name') && session()->get('rol') === '0')
        <a class="btn--addCard--countMaster btn-sm text-dark viewCP"
        id="addProCard{{ $itemSearch->id}}" onclick=" addProCart({{ $itemSearch->id }}, 1, {{ $itemSearch->newPrecio }},
        '{{ $itemSearch->nombre }}', '{{ $itemSearch->imagen }}')">Agregar</a>
        @else

        <a onclick="msjInicieSesion()" class="btn btn--view-add btn-sm " >Agregar </a>
        @endif
                    {{--  <a onclick="return love();"  class="btn btn-sm btn-outline-primary " >Agregar</a>  --}}
                </div>
            </div>
          </div>
        </div>
      </div>
   </div>
@endforeach
</div>
</div>

@include('User.modelAddProCart')

    @endsection
