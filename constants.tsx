import { CellType, LevelData, Challenge } from './types';

// GIFs de suporte visual
const GIFS = {
  ROBOT_A: "caveira.webp",
  ROBOT_B: "caveira.webp",
  CODE: "caveira.webp",
  ALERT: "caveira.webp",
  MATH: "caveira.webp"
};

// Funções auxiliares para criar desafios rapidamente sem repetição
const createChallenge = (id: number, level: 1|2|3, title: string, desc: string, valid: (out: string, code: string) => any, placeholder = "", img = ""): Challenge => ({
  id, level, title, description: desc, placeholder, imageUrl: img || (level === 1 ? GIFS.CODE : level === 2 ? GIFS.MATH : GIFS.ALERT),
  validate: (out, code) => {
    const res = valid(out, code);
    return typeof res === 'boolean' ? { success: res, message: res ? "Perfeito!" : "Tente novamente." } : res;
  }
});

// POOL NÍVEL 1 (60 Desafios - Setores 1 a 6)
const TIER_1_POOL: Challenge[] = [
  createChallenge(1, 1, "Print", "Imprima 'Oi'", (o) => o.trim() === "Oi"),
  createChallenge(2, 1, "Variável", "x=5. Imprima x.", (o) => o.trim() === "5"),
  createChallenge(3, 1, "Soma", "Imprima 2+2", (o) => o.trim() === "4"),
  createChallenge(4, 1, "Subtração", "Imprima 10-7", (o) => o.trim() === "3"),
  createChallenge(5, 1, "Multiplicação", "Imprima 3*4", (o) => o.trim() === "12"),
  createChallenge(6, 1, "Divisão", "Imprima 10/2", (o) => parseFloat(o) === 5),
  createChallenge(7, 1, "Tipo Int", "Imprima type(10)", (o) => o.includes("int")),
  createChallenge(8, 1, "Tipo Str", "Imprima type('Ola')", (o) => o.includes("str")),
  createChallenge(9, 1, "Concat", "Imprima 'A' + 'B'", (o) => o.trim() === "AB"),
  createChallenge(10, 1, "Resto", "Resto de 10 por 3 (%)", (o) => o.trim() === "1"),
  createChallenge(11, 1, "Inteiro", "Divisão inteira 10 por 3 (//)", (o) => o.trim() === "3"),
  createChallenge(12, 1, "Potência", "2 ao cubo (2**3)", (o) => o.trim() === "8"),
  createChallenge(13, 1, "Tamanho", "len('Robô')", (o) => o.trim() === "4"),
  createChallenge(14, 1, "Maiúsculo", "'oi'.upper()", (o) => o.trim() === "OI"),
  createChallenge(15, 1, "Minúsculo", "'OI'.lower()", (o) => o.trim() === "oi"),
  createChallenge(16, 1, "Boolean", "Imprima 5 > 3", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(17, 1, "Input Simulado", "x=10. Imprima x*2", (o) => o.trim() === "20"),
  createChallenge(18, 1, "Conversão", "int('5') + 1", (o) => o.trim() === "6"),
  createChallenge(19, 1, "Float", "float(5)", (o) => parseFloat(o) === 5.0),
  createChallenge(20, 1, "String Mult", "Imprima 'A'*3", (o) => o.trim() === "AAA"),
  createChallenge(21, 1, "Negativo", "abs(-10)", (o) => o.trim() === "10"),
  createChallenge(22, 1, "F-String", "n=5. Imprima f'X={n}'", (o) => o.trim() === "X=5"),
  createChallenge(23, 1, "Comentário", "Imprima 1 # e ignore 2", (o) => o.trim() === "1"),
  createChallenge(24, 1, "Lista Vazia", "Imprima []", (o) => o.trim() === "[]"),
  createChallenge(25, 1, "Soma Var", "a=1; b=2. Imprima a+b", (o) => o.trim() === "3"),
  createChallenge(26, 1, "Comparação", "10 == 10", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(27, 1, "Diferente", "5 != 3", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(28, 1, "Arredondar", "round(3.7)", (o) => o.trim() === "4"),
  createChallenge(29, 1, "Mínimo", "min(5, 2, 8)", (o) => o.trim() === "2"),
  createChallenge(30, 1, "Máximo", "max(1, 9, 3)", (o) => o.trim() === "9"),
  // ... (Adicionando mais para garantir 60)

  //Aqui Novos!!!
  createChallenge(31, 1, "Zero", "Imprima 0", (o) => o.trim() === "0"),
  createChallenge(32, 1, "Boolean False", "Imprima 3 > 5", (o) => o.trim().toUpperCase() === "FALSE"),
  createChallenge(33, 1, "Soma Float", "Imprima 1.5 + 1.5", (o) => parseFloat(o) === 3),
  createChallenge(34, 1, "String Len", "len('Python')", (o) => o.trim() === "6"),
  createChallenge(35, 1, "Subtração Var", "x=10; y=4; x-y", (o) => o.trim() === "6"),
  createChallenge(36, 1, "Multiplica Var", "a=2; b=5; a*b", (o) => o.trim() === "10"),
  createChallenge(37, 1, "Divisão Float", "Imprima 7/2", (o) => parseFloat(o) === 3.5),
  createChallenge(38, 1, "Resto Par", "8 % 2", (o) => o.trim() === "0"),
  createChallenge(39, 1, "Concat Espaço", "'Olá' + ' Mundo'", (o) => o.trim() === "Olá Mundo"),
  createChallenge(40, 1, "String Index", "'Casa'[0]", (o) => o.trim() === "C"),
  createChallenge(41, 1, "String Última", "'Casa'[-1]", (o) => o.trim() === "a"),
  createChallenge(42, 1, "Maior Igual", "5 >= 5", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(43, 1, "Menor", "2 < 5", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(44, 1, "Negação", "not False", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(45, 1, "Boolean AND", "True and False", (o) => o.trim().toUpperCase() === "FALSE"),
  createChallenge(46, 1, "Boolean OR", "True or False", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(47, 1, "Int Negativo", "Imprima -5", (o) => o.trim() === "-5"),
  createChallenge(48, 1, "Float Negativo", "Imprima -2.5", (o) => parseFloat(o) === -2.5),
  createChallenge(49, 1, "Conversão Str", "str(10)", (o) => o.trim() === "10"),
  createChallenge(50, 1, "Boolean Igual", "True == True", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(51, 1, "Potência 2", "3**2", (o) => o.trim() === "9"),
  createChallenge(52, 1, "Valor Absoluto", "abs(-7)", (o) => o.trim() === "7"),
  createChallenge(53, 1, "Round Baixo", "round(2.2)", (o) => o.trim() === "2"),
  createChallenge(54, 1, "Min Dois", "min(3, 1)", (o) => o.trim() === "1"),
  createChallenge(55, 1, "Max Dois", "max(3, 1)", (o) => o.trim() === "3"),
  createChallenge(56, 1, "Concat Num", "'A' + str(1)", (o) => o.trim() === "A1"),
  createChallenge(57, 1, "Multiplica String", "'Hi' * 2", (o) => o.trim() === "HiHi"),
  createChallenge(58, 1, "Divisão Exata", "9/3", (o) => o.trim() === "3.0" || o.trim() === "3"),
  createChallenge(59, 1, "Comparação Float", "3.0 == 3", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(60, 1, "Print Número", "Imprima 100", (o) => o.trim() === "100"),
  ...Array.from({length: 30}, (_, i) => createChallenge(31 + i, 1, `Base ${i+31}`, `Imprima ${i+100}`, (o) => o.trim() === (i+100).toString()))
];

// POOL NÍVEL 2 (70 Desafios - Setores 7 a 13)
const TIER_2_POOL: Challenge[] = [
  createChallenge(61, 2, "If", "Se 5>2 imprima 'SIM'", (o) => o.trim() === "SIM"),
  createChallenge(62, 2, "Else", "Se 1>2 imprima 'A' senão 'B'", (o) => o.trim() === "B"),
  createChallenge(63, 2, "Range", "Lista de 0 a 2 (list(range(3)))", (o) => o.trim().replace(/\s/g, "") === "[0,1,2]"),
  createChallenge(64, 2, "For Loop", "Imprima 1 e 2 usando for", (o) => o.trim() === "1\n2"),
  createChallenge(65, 2, "While", "Imprima 5 usando while i < 6", (o) => o.includes("5")),
  createChallenge(66, 2, "List Append", "L=[]; L.append(1); Imprima L", (o) => o.trim() === "[1]"),
  createChallenge(67, 2, "List Index", "L=[10, 20]; Imprima L[1]", (o) => o.trim() === "20"),
  createChallenge(68, 2, "List Sum", "sum([1, 2, 3])", (o) => o.trim() === "6"),
  createChallenge(69, 2, "String Slice", "'Python'[0:2]", (o) => o.trim() === "Py"),
  createChallenge(70, 2, "If Par", "Se 4%2==0 imprima 'PAR'", (o) => o.trim() === "PAR"),
  createChallenge(71, 2, "List Len", "len([1, 1, 1])", (o) => o.trim() === "3"),
  createChallenge(72, 2, "Break", "for i in range(5): break; Imprima i", (o) => o.trim() === "0"),
  createChallenge(73, 2, "In Operator", "Imprima 1 in [1, 2]", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(74, 2, "List Sort", "L=[3,1,2]; L.sort(); Imprima L", (o) => o.trim().replace(/\s/g, "") === "[1,2,3]"),
  createChallenge(75, 2, "String In", "Imprima 'a' in 'casa'", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(76, 2, "List Pop", "L=[1,2]; L.pop(); Imprima L", (o) => o.trim() === "[1]"),
  createChallenge(77, 2, "Count", "'banana'.count('a')", (o) => o.trim() === "3"),
  createChallenge(78, 2, "Replace", "'pato'.replace('p','r')", (o) => o.trim() === "rato"),
  createChallenge(79, 2, "Join", "'-'.join(['a','b'])", (o) => o.trim() === "a-b"),
  createChallenge(80, 2, "Split", "'a b'.split()", (o) => o.includes("'a'") && o.includes("'b'")),

  //Aqui Novos!!!
  createChallenge(81, 2, "For Soma", "Some 1+2+3 usando for", (o) => o.trim() === "6"),
  createChallenge(82, 2, "While Count", "Conte de 1 até 3 usando while", (o) => o.includes("3")),
  createChallenge(83, 2, "If False", "Se 2>5 imprima 'SIM'", (o) => o.trim() === ""),
  createChallenge(84, 2, "If Else Num", "Se 3>5 imprima 1 senão 0", (o) => o.trim() === "0"),
  createChallenge(85, 2, "Lista Mult", "[1]*3", (o) => o.trim().replace(/\s/g, "") === "[1,1,1]"),
  createChallenge(86, 2, "Lista Concat", "[1]+[2]", (o) => o.trim().replace(/\s/g, "") === "[1,2]"),
  createChallenge(87, 2, "Slice Meio", "'Python'[1:4]", (o) => o.trim() === "yth"),
  createChallenge(88, 2, "Upper", "'ola'.upper()", (o) => o.trim() === "OLA"),
  createChallenge(89, 2, "Lower", "'OLA'.lower()", (o) => o.trim() === "ola"),
  createChallenge(90, 2, "StartsWith", "'casa'.startswith('c')", (o) => o.trim().toUpperCase() === "TRUE"),

  createChallenge(91, 2, "EndsWith", "'casa'.endswith('a')", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(92, 2, "For Range", "Imprima 0,1,2 usando range", (o) => o.includes("2")),
  createChallenge(93, 2, "While Break", "Pare loop quando i==2", (o) => o.includes("2")),
  createChallenge(94, 2, "Continue", "Pule o número 2 no loop", (o) => !o.includes("2")),
  createChallenge(95, 2, "Lista Clear", "L=[1]; L.clear(); Imprima L", (o) => o.trim() === "[]"),
  createChallenge(96, 2, "Index", "[5,6,7].index(6)", (o) => o.trim() === "1"),
  createChallenge(97, 2, "Max Lista", "max([1,9,3])", (o) => o.trim() === "9"),
  createChallenge(98, 2, "Min Lista", "min([1,9,3])", (o) => o.trim() === "1"),
  createChallenge(99, 2, "Sum Lista", "sum([2,2,2])", (o) => o.trim() === "6"),
  createChallenge(100, 2, "Len String", "len('abc')", (o) => o.trim() === "3"),

  createChallenge(101, 2, "If Igual", "Se 3==3 imprima OK", (o) => o.trim() === "OK"),
  createChallenge(102, 2, "If Diferente", "Se 3!=4 imprima SIM", (o) => o.trim() === "SIM"),
  createChallenge(103, 2, "Lista Insert", "L=[1,3]; L.insert(1,2)", (o) => o.includes("2")),
  createChallenge(104, 2, "Reverse", "L=[1,2]; L.reverse()", (o) => o.includes("2")),
  createChallenge(105, 2, "Sort Desc", "L=[1,3,2]; L.sort(reverse=True)", (o) => o.replace(/\s/g,"")==="[3,2,1]"),
  createChallenge(106, 2, "String Replace", "'abc'.replace('b','x')", (o) => o.trim() === "axc"),
  createChallenge(107, 2, "Split Vírgula", "'a,b'.split(',')", (o) => o.includes("a") && o.includes("b")),
  createChallenge(108, 2, "Join Espaço", "' '.join(['a','b'])", (o) => o.trim() === "a b"),
  createChallenge(109, 2, "For Len", "Conte elementos da lista", (o) => o.trim() === "3"),
  createChallenge(110, 2, "While Soma", "Some 1+2 usando while", (o) => o.trim() === "3"),

  createChallenge(111, 2, "If And", "Se True and False imprima SIM", (o) => o.trim() === ""),
  createChallenge(112, 2, "If Or", "Se True or False imprima SIM", (o) => o.trim() === "SIM"),
  createChallenge(113, 2, "Not", "not False", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(114, 2, "Lista Remove", "L=[1,2]; L.remove(1)", (o) => o.includes("2")),
  createChallenge(115, 2, "For String", "Percorra 'abc' com for", (o) => o.includes("c")),
  createChallenge(116, 2, "While False", "Loop enquanto i<0", (o) => o.trim() === ""),
  createChallenge(117, 2, "In String", "'x' in 'xyz'", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(118, 2, "Count Lista", "[1,1,2].count(1)", (o) => o.trim() === "2"),
  createChallenge(119, 2, "Index String", "'abc'.index('b')", (o) => o.trim() === "1"),
  createChallenge(120, 2, "Slice Final", "'Python'[3:]", (o) => o.trim() === "hon"),

  createChallenge(121, 2, "For Even", "Imprima pares até 4", (o) => o.includes("4")),
  createChallenge(122, 2, "While Dec", "Conte de 3 até 1", (o) => o.includes("1")),
  createChallenge(123, 2, "If Nested", "If dentro de if", (o) => o.includes("OK")),
  createChallenge(124, 2, "Lista Copy", "L=[1]; C=L.copy()", (o) => o.includes("1")),
  createChallenge(125, 2, "Tuple", "(1,2)", (o) => o.includes("1")),
  createChallenge(126, 2, "Tuple Len", "len((1,2,3))", (o) => o.trim() === "3"),
  createChallenge(127, 2, "For Tuple", "Percorra tupla", (o) => o.includes("2")),
  createChallenge(128, 2, "In Tuple", "2 in (1,2,3)", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(129, 2, "List To Str", "str([1,2])", (o) => o.includes("[")),
  createChallenge(130, 2, "Fim Tier 2", "Imprima 'OK'", (o) => o.trim() === "OK"),
  ...Array.from({length: 50}, (_, i) => createChallenge(81 + i, 2, `Lógica ${i+81}`, `Imprima ${i*2}`, (o) => o.trim() === (i*2).toString()))
];

// POOL NÍVEL 3 (70 Desafios - Setores 14 a 20)
const TIER_3_POOL: Challenge[] = [
  createChallenge(131, 3, "Função", "def f(): return 1. Imprima f()", (o) => o.trim() === "1"),
  createChallenge(132, 3, "Parâmetro", "def s(a): return a+1. Imprima s(5)", (o) => o.trim() === "6"),
  createChallenge(133, 3, "Dict", "d={'a':1}. Imprima d['a']", (o) => o.trim() === "1"),
  createChallenge(134, 3, "Dict Add", "d={}. d['x']=9. Imprima d", (o) => o.includes("'x': 9")),
  createChallenge(135, 3, "Lambda", "f=lambda x:x*2. Imprima f(4)", (o) => o.trim() === "8"),
  createChallenge(136, 3, "List Comp", "Imprima [x for x in [1,2]]", (o) => o.replace(/\s/g,"") === "[1,2]"),
  createChallenge(137, 3, "Try", "try: 1/0\nexcept: print('E')", (o) => o.trim() === "E"),
  createChallenge(138, 3, "Map", "list(map(str,[1]))", (o) => o.includes("'1'")),
  createChallenge(139, 3, "Filter", "list(filter(lambda x:x>0,[1,-1]))", (o) => o.trim() === "[1]"),
  createChallenge(140, 3, "Dict Keys", "list({'a':1}.keys())", (o) => o.includes("'a'")),

  createChallenge(141, 3, "Global", "x=1\ndef f(): global x; x=2\nf(); print(x)", (o) => o.trim() === "2"),
  createChallenge(142, 3, "Args", "def f(*a): return a[0]\nprint(f(9))", (o) => o.trim() === "9"),
  createChallenge(143, 3, "Kwargs", "def f(**k): return k['x']\nprint(f(x=7))", (o) => o.trim() === "7"),
  createChallenge(144, 3, "Set", "len({1,1,2})", (o) => o.trim() === "2"),
  createChallenge(145, 3, "Classe", "class A: x=1\nprint(A.x)", (o) => o.trim() === "1"),
  createChallenge(146, 3, "Init", "class A:\n def __init__(s): s.v=5\nprint(A().v)", (o) => o.trim() === "5"),
  createChallenge(147, 3, "IsInstance", "isinstance(1,int)", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(148, 3, "Zip", "list(zip([1],[2]))", (o) => o.includes("(1, 2)")),
  createChallenge(149, 3, "Enumerate", "list(enumerate(['a']))", (o) => o.includes("(0, 'a')")),
  createChallenge(150, 3, "All", "all([True,False])", (o) => o.trim().toUpperCase() === "FALSE"),

  createChallenge(151, 3, "Any", "any([False,True])", (o) => o.trim().toUpperCase() === "TRUE"),
  createChallenge(152, 3, "Sum", "sum([1,2,3])", (o) => o.trim() === "6"),
  createChallenge(153, 3, "Max", "max([1,5,2])", (o) => o.trim() === "5"),
  createChallenge(154, 3, "Min", "min([1,5,2])", (o) => o.trim() === "1"),
  createChallenge(155, 3, "Sorted", "sorted([3,1,2])", (o) => o.replace(/\s/g,"") === "[1,2,3]"),
  createChallenge(156, 3, "Tuple", "t=(1,2)\nprint(t[0])", (o) => o.trim() === "1"),
  createChallenge(157, 3, "Set Add", "s=set(); s.add(1); print(len(s))", (o) => o.trim() === "1"),
  createChallenge(158, 3, "Dict Len", "len({'a':1,'b':2})", (o) => o.trim() === "2"),
  createChallenge(159, 3, "Type", "type(1).__name__", (o) => o.trim() === "int"),
  createChallenge(160, 3, "Bool", "bool(0)", (o) => o.trim().toUpperCase() === "FALSE"),

  // DESAFIOS MAIS ELABORADOS — NÍVEL 3 (161 a 200)

createChallenge(161, 3, "Função Soma", "Crie uma função soma(a,b) que retorne a soma de 3 e 4", (o) => o.trim() === "7"),
createChallenge(162, 3, "Loop Soma", "Some os números de 1 a 3 usando for", (o) => o.trim() === "6"),
createChallenge(163, 3, "Lista Pares", "Crie uma lista com os pares de 1 a 5", (o) => o.replace(/\s/g,"") === "[2,4]"),
createChallenge(164, 3, "Contador", "Conte quantos números são maiores que 2 em [1,2,3,4]", (o) => o.trim() === "2"),
createChallenge(165, 3, "Máximo Manual", "Encontre o maior número de [3,7,2] sem usar max()", (o) => o.trim() === "7"),
createChallenge(166, 3, "Dicionário Loop", "Some os valores do dicionário {'a':1,'b':2}", (o) => o.trim() === "3"),
createChallenge(167, 3, "Função Par", "Crie uma função que retorne True se 4 for par", (o) => o.trim().toUpperCase() === "TRUE"),
createChallenge(168, 3, "Lista Quadrados", "Crie uma lista com os quadrados de [1,2,3]", (o) => o.replace(/\s/g,"") === "[1,4,9]"),
createChallenge(169, 3, "String Reversa", "Inverta a string 'abc'", (o) => o.trim() === "cba"),
createChallenge(170, 3, "Contar Letras", "Conte quantas vezes 'a' aparece em 'banana'", (o) => o.trim() === "3"),

createChallenge(171, 3, "Filtro Manual", "Crie uma lista apenas com números >2 em [1,2,3,4]", (o) => o.replace(/\s/g,"") === "[3,4]"),
createChallenge(172, 3, "Função Média", "Crie uma função que calcule a média de [2,4]", (o) => o.trim() === "3"),
createChallenge(173, 3, "Classe Simples", "Crie uma classe Pessoa com atributo nome='Ana' e imprima", (o) => o.trim() === "Ana"),
createChallenge(174, 3, "Método Classe", "Crie uma classe com método que retorna 10", (o) => o.trim() === "10"),
createChallenge(175, 3, "While Soma", "Use while para somar 1+2+3", (o) => o.trim() === "6"),
createChallenge(176, 3, "Lista Única", "Remova duplicados de [1,1,2,2]", (o) => o.replace(/\s/g,"") === "[1,2]"),
createChallenge(177, 3, "Dicionário Chaves", "Conte quantas chaves tem {'x':1,'y':2,'z':3}", (o) => o.trim() === "3"),
createChallenge(178, 3, "Função Fatorial", "Calcule o fatorial de 4", (o) => o.trim() === "24"),
createChallenge(179, 3, "Busca Lista", "Verifique se 5 está em [1,3,5]", (o) => o.trim().toUpperCase() === "TRUE"),
createChallenge(180, 3, "Ordenação Manual", "Ordene [3,1,2] sem usar sort()", (o) => o.replace(/\s/g,"") === "[1,2,3]"),

createChallenge(181, 3, "Map Manual", "Multiplique cada item de [1,2,3] por 2", (o) => o.replace(/\s/g,"") === "[2,4,6]"),
createChallenge(182, 3, "Reduce Soma", "Some os valores de [1,2,3] usando loop", (o) => o.trim() === "6"),
createChallenge(183, 3, "Contador Vogais", "Conte as vogais em 'uva'", (o) => o.trim() === "2"),
createChallenge(184, 3, "Classe Contador", "Crie uma classe com contador iniciando em 0 e incremente 1", (o) => o.trim() === "1"),
createChallenge(185, 3, "Lista Índice", "Imprima o índice do valor 3 em [1,2,3,4]", (o) => o.trim() === "2"),
createChallenge(186, 3, "Função Máx", "Crie uma função que retorne o maior de (3,9)", (o) => o.trim() === "9"),
createChallenge(187, 3, "Contar Positivos", "Conte quantos números são positivos em [-1,2,3]", (o) => o.trim() === "2"),
createChallenge(188, 3, "Classe Init", "Classe Produto com preço=10. Imprima preço", (o) => o.trim() === "10"),
createChallenge(189, 3, "Função String", "Crie função que retorne tamanho de 'python'", (o) => o.trim() === "6"),
createChallenge(190, 3, "Lista Reversa", "Inverta a lista [1,2,3]", (o) => o.replace(/\s/g,"") === "[3,2,1]"),

createChallenge(191, 3, "Dict Valores", "Imprima todos os valores de {'a':1,'b':2}", (o) => o.includes("1") && o.includes("2")),
createChallenge(192, 3, "Função Boolean", "Crie função que retorne False", (o) => o.trim().toUpperCase() === "FALSE"),
createChallenge(193, 3, "Loop Enumerate", "Use enumerate para imprimir índice 0 de ['x']", (o) => o.includes("0")),
createChallenge(194, 3, "Classe Soma", "Classe Calculadora com método soma(2,3)", (o) => o.trim() === "5"),
createChallenge(195, 3, "Lista Condicional", "Crie lista com números >1 em [1,2,3]", (o) => o.replace(/\s/g,"") === "[2,3]"),
createChallenge(196, 3, "Função Lambda", "Use lambda para dobrar 5", (o) => o.trim() === "10"),
createChallenge(197, 3, "Classe Boolean", "Classe com método que retorna True", (o) => o.trim().toUpperCase() === "TRUE"),
createChallenge(198, 3, "Contador Loop", "Conte de 1 até 3 usando loop", (o) => o.includes("1") && o.includes("3")),
createChallenge(199, 3, "Função Lista", "Crie função que retorne [1,2]", (o) => o.replace(/\s/g,"") === "[1,2]"),
createChallenge(200, 3, "Desafio Final", "Some pares de [1,2,3,4]", (o) => o.trim() === "6"),

  ...Array.from({length: 50}, (_, i) => createChallenge(151 + i, 3, `Sênior ${i+151}`, `Imprima ${i+500}`, (o) => o.trim() === (i+500).toString()))
];

const generateChallengesForLevel = (levelId: number): Challenge[] => {
  let source: Challenge[];
  let startIndex: number;

  if (levelId <= 6) {
    source = TIER_1_POOL;
    startIndex = (levelId - 1) * 10;
  } else if (levelId <= 13) {
    source = TIER_2_POOL;
    startIndex = (levelId - 7) * 10;
  } else {
    source = TIER_3_POOL;
    startIndex = (levelId - 14) * 10;
  }

  // Pega 10 desafios únicos da fatia correta do pool
  return source.slice(startIndex, startIndex + 10).map((c, i) => ({
    ...c,
    id: i + 1 // Re-id para 1-10 para controle das portas do grid
  }));
};

const createMazeGrid = (levelIndex: number): number[][] => {
  const size = 15;
  const grid = Array(size).fill(null).map(() => Array(size).fill(CellType.WALL));
  const rSeed = levelIndex * 1337;
  
  for (let r = 1; r < size - 1; r++) {
    if (r % 2 !== 0) {
      for (let c = 1; c < size - 1; c++) grid[r][c] = CellType.EMPTY;
    } else {
      const connectCol = (Math.floor(rSeed / (r + 1)) % 2 === 0) ? 1 : size - 2;
      grid[r][connectCol] = CellType.EMPTY;
    }
  }

  const pathCells: {r: number, c: number}[] = [];
  for (let r = 1; r < size - 1; r++) {
    if (r % 2 !== 0) {
      const isRight = (Math.floor(rSeed / (r + 2)) % 2 === 0);
      if (isRight) {
        for (let c = 1; c < size - 1; c++) pathCells.push({r, c});
      } else {
        for (let c = size - 2; c >= 1; c--) pathCells.push({r, c});
      }
    } else {
      const connectCol = (Math.floor(rSeed / (r + 1)) % 2 === 0) ? 1 : size - 2;
      pathCells.push({r, c: connectCol});
    }
  }

  const interval = Math.floor(pathCells.length / 11);
  for (let i = 1; i <= 10; i++) {
    const pos = pathCells[i * interval];
    if (pos) grid[pos.r][pos.c] = CellType.DOOR;
  }

  grid[1][1] = CellType.START;
  grid[size - 2][size - 2] = CellType.END;
  return grid;
};

export const LEVELS: LevelData[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: [
    "Fundamentos de Output", "Variáveis e Núcleos", "Sincronia Matemática", "Alocação de Strings", "Protocolos de Tipo",
    "Operações de Bits", "Cadeias de Decisão", "Loops de Iteração", "Vetores de Dados", "Processamento de Texto",
    "Listas de Comando", "Manipulação de Fluxo", "Estruturas Estáticas", "Núcleos de Função", "Dicionários Mestre",
    "Arquitetura de Dados", "Tratamento de Exceção", "Algoritmos Lambda", "Abstração de Objetos", "Compilador Final"
  ][i],
  grid: createMazeGrid(i),
  challenges: generateChallengesForLevel(i + 1),
  robotImageUrl: i % 2 === 0 ? GIFS.ROBOT_A : GIFS.ROBOT_B
}));
