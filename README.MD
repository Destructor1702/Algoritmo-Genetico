Algoritmos Geneticos (AGs)

===================================================================

1 - Un sitiema biologico tiene una poblacion de individuos
    muchos de los cuales tienen la capacidad de reproducirse

2 - Los individuos tienen esperanza de vida finita

3 - Hay variacion en la poblacion

--------------------------------------------------------------------

Solucion potencial => "solucion candidata" o "individuo"

Grupo de individuos => "Poblacion"

--------------------------------------------------------------------

problema robot P(ligero/Bateria)

+ Se requiere esquema de codificacion

+ funcion objetivo

 f = Rango(Hrs) + Poder(Watts) - Masa(KG)

Generar poblacion inicial aleatoria
 I1 = (010101) combinacion Esquema

cada bit es llamado alelo

secuencia de bits que contiene una caracteristica
es llamado gen

genes especificos son llamados genotipos

parametros que representa Genotipo son llamados fenotipos

----------------------------------------------------------------------

los padres se reproducen

010101-:011001
101001-:100101

se reemplaza la poblacion con hijos y los padres mueren

Para elegir a los padres deacuerdo a su fitness(f)
Ruleta de seleccion

Pseudocodigo ruleta


	r <- aleatorio(0,1)
	si r<0.1
		Padre = Ind1
	sino si r<0.3
		Padre = Ind2
		.
		.
		.
	fin del si


Mutacion
	rango de mutacion ~1%
	cada  decendiente tiene una posibilidad de 1% de
	que un alelo mute


===========================================================================

Pseudocodigo Algoritmo Genetico

Padres = {Poblacion Generada aleatoriamente}

Mientras(!Criterio de terminacion)
	Calcular la condicion para cada padre de la poblacion
	Hijos <- 0
	Mientras |Hijos|<|Padres|
		Usar la seleccion probabilistica de la condicion
		(Ruleta) para seleccionar un par de padres
		Reproducir a los padres para crear a los hijos(h1,h2)
		Hijos <- Hijos + {h1,h2}
	Bucle
	Aleatoriamente Mutar algunos Hijos
	Padres <- Hijos
Siguiente Generacion

============================================================================

Parametros de especificacion para obtener buenos resultados

1 - Esquema de codificacion

2 - funcion objetivo que mapea las soluciones del problema a los valores de
    condicion de cada individuo 

3 - Tamaño de la poblacion

4 - Metodo de seleccion (Ruleta u otro)

5 - Rango de mutacion

6 - escala de condicion "Fitness"

7 - Tipo de Cruce

8 - Incesto

------------------------------------------------------------------------------

Practica 1

considere el problema de minimizacion

	minx f(x)=x^4 + 5x^3 +4x^2 -4x +1

supongamos que el minimo ocurre en x E [-4,-1]

codificamos x con 4 bits

0000 = -4.0
0001 = -3.8
0010 = -3.6
	.
	.
	.
1110 = -1.2
1111 = -1.0